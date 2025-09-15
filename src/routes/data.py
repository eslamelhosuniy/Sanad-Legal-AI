import logging
from fastapi import FastAPI,APIRouter,Depends,UploadFile,status
from fastapi.responses import JSONResponse
import aiofiles
from helpers.config import get_settings, Settings
from controllers import DataController,ProjectController,ProcessController
from models import ResponseSignal
from .schemes.data import ProcessRequest
import os

data_router = APIRouter(prefix="/api/v1/data",tags = ["api v1/data"])
logger = logging.getLogger('uvicorn.error')

@data_router.post("/upload/{project_id}")
async def upload_data(project_id:str , file:UploadFile,app_settings: Settings = Depends(get_settings)):
        data_ontroller = DataController()
        is_valid,msg = data_ontroller.validate_uploaded_file(file=file)
        file_path,file_id = data_ontroller.generate_unique_filename(orig_file_name=file.filename,project_id=project_id)
        if not is_valid:
                return JSONResponse (
                
                        status_code = status.HTTP_400_BAD_REQUEST,
                        content = {
                                "status":status.HTTP_400_BAD_REQUEST,
                                "content" :{ "msg":msg}
                        
                }
                )
        else:
                 try:
                         async with aiofiles.open(file_path, "wb") as f:
                          while chunk := await file.read(app_settings.FILE_DEFAULT_CHUNK_SIZE):
                                  await f.write(chunk)
                 except Exception as e:
                          logger.error(f"Error while uploading file:{e}")
                          return JSONResponse (
                
                        status_code = status.HTTP_400_BAD_REQUEST,
                        content = {
                                "status":status.HTTP_400_BAD_REQUEST,
                                "content" : {"msg":ResponseSignal.FILE_UPLOAD_FAILED.value}
                        
                }
                )

                         
                 project_dir_path = ProjectController().get_project_path(project_id=project_id)
                 return JSONResponse (
                                
                                status_code = status.HTTP_200_OK,
                                content = {
                                        "status":status.HTTP_200_OK,
                                        "content" :{ "msg":msg,"file_id":file_id}
                                }
                        )
        

@data_router.get("/process/{project_id}")
async def process_endpoint(project_id:str,process_request: ProcessRequest):
        file_id = process_request.file_id
        chunk_size = process_request.Chunk_size
        overlap_size = process_request.Overlap_size
        Process_controller = ProcessController(project_id=project_id)
        file_content = Process_controller.get_file_content(file_id=file_id)
        file_chunks = Process_controller.process_file_content(
                file_content=file_content,
                file_id=file_id,
                chunk_size=chunk_size,
                overlap_size=overlap_size
        )
        
        if file_chunks is None or len(file_chunks) == 0:
                return JSONResponse(
                        status_code = status.HTTP_400_BAD_REQUEST,
                        content={
                                "status":status.HTTP_400_BAD_REQUEST,
                                "content" :{ "msg":ResponseSignal.PROCESSING_FAILED.value,"file_id":file_id}
                        }
                )
        file_chunks_records = [
            {
                "chunk_text":chunk.page_content,
                "chunk_metadata":chunk.metadata,
                
            }
            for i, chunk in enumerate(file_chunks)
        ]
        return JSONResponse(
                        status_code = status.HTTP_200_OK,
                        content={
                                "status":status.HTTP_200_OK,
                                "content" :{ "msg":ResponseSignal.PROCESSING_SUCCESS.value,"file_id":file_id,"file_chunks":file_chunks_records}
                        }
                )
                        

