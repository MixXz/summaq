import os
from collections import namedtuple

# Local LLM (Ollama OpenAI-compatible)
LLM = namedtuple('LLM', ['BASE_URL', 'API_KEY', 'MODEL'])
LOCAL_LLM = LLM(
    BASE_URL=os.environ.get("LOCAL_LLM_BASE_URL", "http://localhost:11434/v1"),
    API_KEY=os.environ.get("LOCAL_LLM_API_KEY", "ollama"),  # dummy string is fine
    MODEL=os.environ.get("LOCAL_LLM_MODEL", "mistral:instruct")
)

# Logging config
import logging
Config = namedtuple('Config', ['LEVEL', 'FORMAT'])
LOGGER = Config(LEVEL=logging.INFO, FORMAT='[%(asctime)s] %(levelname)s: %(message)s')
