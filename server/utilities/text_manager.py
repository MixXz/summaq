import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize


def text_to_bullet_points(text: str) -> [str]:
    sentences = sent_tokenize(text)
    points = [sentence for sentence in sentences if sentence.strip() != ""]

    return points
