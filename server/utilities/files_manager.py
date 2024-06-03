import io
import os

from PyPDF2 import PdfReader
from docx import Document
from fastapi import UploadFile


async def read_file(file: UploadFile) -> str | None:
    file_extension = os.path.splitext(file.filename)[1].lower()
    content = ""
    try:
        if file_extension == '.txt':
            content = await file.read()
            content = content.decode('utf-8')

        elif file_extension == '.pdf':
            content_bytes = await file.read()
            reader = PdfReader(io.BytesIO(content_bytes))
            for page in reader.pages:
                content += page.extract_text() if page.extract_text() else ''

        elif file_extension == '.docx':
            content_bytes = await file.read()
            doc = Document(io.BytesIO(content_bytes))
            content = '\n'.join([para.text for para in doc.paragraphs])
        else:
            return None

        return content

    except Exception as e:
        return f"An error occurred reading file: {str(e)}"
