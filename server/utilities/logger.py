import logging

from constants import LOGGER

logging.basicConfig(level=LOGGER.LEVEL, format=LOGGER.FORMAT)
logger = logging.getLogger(__name__)
