import math
import re
from openai import OpenAI
from constants import LOCAL_LLM
from utilities.logger import logger

client = OpenAI(base_url=LOCAL_LLM.BASE_URL, api_key=LOCAL_LLM.API_KEY)

def _chat(messages, temperature=0.2, max_tokens=512):
    resp = client.chat.completions.create(
        model=LOCAL_LLM.MODEL,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens
    )
    return resp.choices[0].message.content.strip()

def _parse_bullets(md_text: str) -> list[str]:
    """
    Parse Markdown bullets/numbered lists into a clean list[str].
    Accepts -, *, +, • and '1. ' styles. Falls back to sentence-ish split.
    """
    lines = [ln.strip() for ln in md_text.splitlines()]
    bullets = []
    for ln in lines:
        if not ln:
            continue
        if ln.startswith(("- ", "* ", "+ ", "• ")):
            bullets.append(ln[2:].strip())
            continue
        if re.match(r"^\d+\.\s+", ln):
            bullets.append(re.sub(r"^\d+\.\s+", "", ln).strip())
    if bullets:
        return [b for b in bullets if b]

    return [s.strip() for s in re.split(r"(?<=[.!?])\s+", md_text) if s.strip()]


def summarize_text(input_text: str, summary_percentage: int, bullet_format: bool = False) -> str | list[str] | None:
    """
    When bullet_format=True, instruct the model to output ONLY a Markdown bullet list,
    then parse it into list[str]. Otherwise, return a paragraph string.
    """
    logger.info("Summarizing text locally...")
    summary_percentage = max(1, min(100, int(summary_percentage)))

    target_tokens = max(64, min(2048, math.ceil(len(input_text) / 4 * (summary_percentage / 100.0))))

    if bullet_format:
        system = "You are precise and terse. Output strictly a Markdown bullet list; no title, no preamble."
        user = (
            f"Summarize the following text to ~{summary_percentage}% of its length.\n"
            f"- Use concise bullet points, each one sentence.\n"
            f"- No headers, no explanations. Bullets only.\n\n"
            f"---\n{input_text}\n---"
        )
        out = _chat(
            [{"role": "system", "content": system},
             {"role": "user", "content": user}],
            temperature=0.2, max_tokens=target_tokens
        )
        return _parse_bullets(out)

    # paragraph mode
    system = "You are a precise, terse assistant. Summaries must be faithful and non-hallucinatory."
    user = (
        f"Summarize the following text to roughly {summary_percentage}% of its length, "
        f"in a single cohesive paragraph.\n\n---\n{input_text}\n---"
    )
    out = _chat(
        [{"role": "system", "content": system},
         {"role": "user", "content": user}],
        temperature=0.2, max_tokens=target_tokens
    )
    return out

def question_answer(context: str, question: str) -> str | None:
    """
    Context-grounded QA; refuse if not in context.
    """
    logger.info("Answering question locally...")
    system = (
        "You answer strictly from the provided Context. "
        "If the answer is not present, reply exactly: 'Not in the provided context.'"
    )
    user = f"Context:\n{context}\n\nQuestion: {question}\n\nAnswer concisely."
    return _chat(
        [{"role": "system", "content": system},
         {"role": "user", "content": user}],
        temperature=0.0, max_tokens=384
    )
