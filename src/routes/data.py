import logging
from fastapi import FastAPI, APIRouter, Depends, UploadFile, status, Request, Body
from fastapi.responses import JSONResponse
import aiofiles
from helpers.config import get_settings, Settings
from controllers import DataController, ProjectController, ProcessController
from models import ResponseSignal, ProjectModel
from .schemes.data import ProcessRequest
import os
from controllers.ServiceController import (
    enhanced_answer_pipeline,
    format_answer,
    load_documents,
    load_vector_db,
    create_vector_db,
    VECTOR_DB_DIR,
)

data_router = APIRouter(prefix="/api/v1/data", tags=["api v1/data"])
logger = logging.getLogger("uvicorn.error")


@data_router.post("/upload/{project_id}")
async def upload_data(
    request: Request,
    project_id: str,
    file: UploadFile,
    app_settings: Settings = Depends(get_settings),
):
    project_model = ProjectModel(db_client=request.app.db_client)
    project = await project_model.get_project_or_create_one(project_id=project_id)

    data_ontroller = DataController()
    is_valid, msg = data_ontroller.validate_uploaded_file(file=file)
    file_path, file_id = data_ontroller.generate_unique_filename(
        orig_file_name=file.filename, project_id=project_id  # type:ignore
    )
    if not is_valid:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"status": status.HTTP_400_BAD_REQUEST, "content": {"msg": msg}},
        )
    else:
        try:
            async with aiofiles.open(file_path, "wb") as f:
                while chunk := await file.read(app_settings.FILE_DEFAULT_CHUNK_SIZE):
                    await f.write(chunk)
        except Exception as e:
            logger.error(f"Error while uploading file:{e}")
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "status": status.HTTP_400_BAD_REQUEST,
                    "content": {"msg": ResponseSignal.FILE_UPLOAD_FAILED.value},
                },
            )

        project_dir_path = ProjectController().get_project_path(project_id=project_id)
        print("DEBUG project:", type(project), project)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": status.HTTP_200_OK,
                "content": {
                    "msg": msg,
                    "file_id": file_id,
                    "project_id": str(project._id),
                },
            },
        )


@data_router.get("/process/{project_id}")
async def process_endpoint(project_id: str, process_request: ProcessRequest):
    file_id = process_request.file_id
    chunk_size = process_request.Chunk_size
    overlap_size = process_request.Overlap_size
    Process_controller = ProcessController(project_id=project_id)
    file_content = Process_controller.get_file_content(file_id=file_id)
    file_chunks = Process_controller.process_file_content(
        file_content=file_content,
        file_id=file_id,
        chunk_size=chunk_size,  # type:ignore
        overlap_size=overlap_size,  # type:ignore
    )

    if file_chunks is None or len(file_chunks) == 0:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "status": status.HTTP_400_BAD_REQUEST,
                "content": {
                    "msg": ResponseSignal.PROCESSING_FAILED.value,
                    "file_id": file_id,
                },
            },
        )
    file_chunks_records = [
        {
            "chunk_text": chunk.page_content,
            "chunk_metadata": chunk.metadata,
        }
        for i, chunk in enumerate(file_chunks)
    ]
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={
            "status": status.HTTP_200_OK,
            "content": {
                "msg": ResponseSignal.PROCESSING_SUCCESS.value,
                "file_id": file_id,
                "file_chunks": file_chunks_records,
            },
        },
    )


@data_router.post("/query/{chat_id}")
async def query_endpoint(chat_id: str, query_text: str = Body(...)):
    logging.log(logging.INFO, f"Original Query: {query_text}")

    try:
        # Step 1: Rewrite the question

        # Step 2: Load vector DB (lazy init)
        if os.path.exists(VECTOR_DB_DIR):
            vector_db = load_vector_db()
        else:
            documents = load_documents()
            vector_db = create_vector_db(documents)
        # Step 3: QA chain
        response = enhanced_answer_pipeline(query_text, vector_db=vector_db)

        # Step 5: return result
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "status": status.HTTP_200_OK,
                "query": query_text,
                "response": response["answer"],
                "answer": format_answer(response["answer"]),
                "source_docs": format_answer(response["source_docs"])
            },
        )

    except Exception as e:
        return JSONResponse(
            status_code= status.HTTP_400_BAD_REQUEST,
            content={
                "status": status.HTTP_400_BAD_REQUEST,
                "error": str(e),
                "message": f"{ResponseSignal.QUERY_PROCESSING_FAILED.value} '{query_text}'",
            },
        )
