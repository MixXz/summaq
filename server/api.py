from typing import Optional

import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.responses import JSONResponse

from services.huggingf_service import summarize_text, question_answer
from utilities.files_manager import read_file
from utilities.text_manager import text_to_bullet_points
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"], 
)

@app.get("/")
def health_check():
    return "I'm healthy!"


@app.post("/summarize/")
async def summarize(
        file: Optional[UploadFile] = File(None),
        text: Optional[str] = Form(None),
        summary_percentage: int = Form(50),
        bullet_format: bool = Form(False)
):
    input_text = ""

    if file:
        file_content = await read_file(file)
        if file_content is None:
            raise BadRequestException("Invalid file format.")
        input_text = file_content
    elif text:
        input_text = text
    else:
        raise BadRequestException("Text or file containg text should be provieded.")

    result = summarize_text(input_text, summary_percentage)
    if result is None:
        raise BadRequestException("Error summarizing text.")

    if bullet_format:
        result = text_to_bullet_points(result)

    return {"result": result}


@app.post("/answer/")
async def answer_question(
        file: Optional[UploadFile] = File(None),
        text: Optional[str] = Form(None),
        question: str = Form(None)
):
    context = ""

    if file:
        file_content = await read_file(file)
        if file_content is None:
            raise BadRequestException("Invalid file format.")
        context = file_content
    elif text:
        context = text
    else:
        raise BadRequestException("Text or file containg text should be provieded.")

    answer = question_answer(context, question)
    if answer is None:
        raise BadRequestException("Error answering the question.")

    return {"result": answer}


class BadRequestException(Exception):
    def __init__(self, detail: str):
        self.detail = detail


@app.exception_handler(BadRequestException)
async def bad_request_exception_handler(request: Request, exc: BadRequestException):
    return JSONResponse(
        status_code=400,
        content={"detail": exc.detail},
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5001)
