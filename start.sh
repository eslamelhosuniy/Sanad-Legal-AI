#!/bin/bash
export PYTHONPATH=src
uvicorn src.main:app --host 0.0.0.0 --port ${PORT:-8000}
