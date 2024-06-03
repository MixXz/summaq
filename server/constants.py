import logging
import os
from collections import namedtuple

from dotenv import load_dotenv

load_dotenv()

Config = namedtuple('Config', ['API_KEY', 'BART_URL', 'ROBERTA_URL'])
HUGGING_FACE = Config(API_KEY=os.environ.get("HUGGING_FACE_API_URL"),
                      BART_URL="https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
                      ROBERTA_URL="https://api-inference.huggingface.co/models/deepset/roberta-base-squad2")

Config = namedtuple('Config', ['LEVEL', 'FORMAT'])
LOGGER = Config(LEVEL=logging.INFO,
                FORMAT='[%(asctime)s] %(levelname)s: %(message)s')
