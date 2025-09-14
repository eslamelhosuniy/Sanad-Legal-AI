from fastapi import FastAPI,APIRouter,Depends
from helpers.config import get_settings, Settings
import os

data_router = APIRouter(prefix="/api/v1/data",tags = ["api v1/data"])
