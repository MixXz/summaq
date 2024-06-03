import requests
from requests import Response

from constants import HUGGING_FACE
from utilities.logger import logger


def post_to_hugging_face(url: str, payload: object) -> Response:
    headers = {
        "Authorization": f"Bearer {HUGGING_FACE.API_KEY}"
    }

    logger.info('Sending POST request to hugging face API...')
    response = requests.post(url=url, headers=headers, json=payload)
    logger.info('Received response from hugging face API.')

    return response


def summarize_text(input_text: str, summary_percentage: int) -> str | None:
    logger.info("Summarizing text...")

    words = input_text.split()
    total_len = len(words)
    summary_len = int((summary_percentage / 100) * total_len)

    min_summary_len = int(0.8 * summary_len)
    max_summary_len = int(1.2 * summary_len)

    payload = {
        "inputs": input_text,
        "parameters": {
            "min_length": min_summary_len,
            "max_length": max_summary_len
        },
        "options": {
            "wait_for_model": True
        }
    }

    response = post_to_hugging_face(url=HUGGING_FACE.BART_URL, payload=payload)
    if not response.ok:
        logger.error(f"Failled to summarize text, error code {response.status_code}, error: {response.text}")
        return None

    logger.info("Text summarized.")

    summary = response.json()
    summary_text = summary[0]['summary_text']

    return summary_text


def question_answer(context: str, question: str) -> str | None:
    payload = {
        "inputs": {
            "question": question,
            "context": context
        }
    }

    response = post_to_hugging_face(url=HUGGING_FACE.ROBERTA_URL, payload=payload)

    if not response.ok:
        logger.error(f"Failled to answer the question, error code {response.status_code}, error: {response.text}")
        return None

    answer = response.json()['answer']

    return answer
