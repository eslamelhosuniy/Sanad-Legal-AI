from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path


class Settings(BaseSettings):

    APP_NAME :str
    APP_VERSION :str
    OPENAI_API_KEY :str
    GEMINI_API_KEY :str
    HGFACE_API_KEY :str
    FILE_ALLOWED_TYPES: list
    FILE_MAX_SIZE: int
    FILE_DEFAULT_CHUNK_SIZE:int
    MONGODB_DATABASE: str
    MONGODB_URL : str


    class Config:
        env_file = str(Path(__file__).resolve().parent.parent / "assets" / ".env")

def get_settings():
    return Settings()