import logging
from fastapi import FastAPI,APIRouter,Depends,UploadFile,status
from fastapi.responses import JSONResponse
from helpers.config import get_settings, Settings
from controllers import DataController,ProjectController
from models import ResponseSignal

import os

data_router = APIRouter(prefix="/api/v1/data",tags = ["api v1/data"])
logger = logging.getLogger('uvicorn.error')

@data_router.post("/upload/{project_id}")
async def upload_data(project_id:str , file:UploadFile,app_settings: Settings = Depends(get_settings)):
        data_ontroller = DataController()
        is_valid,msg = data_ontroller.validate_uploaded_file(file=file)
        file_path = data_ontroller.generate_unique_filename(orig_file_name=file.filename,project_id=project_id)
        if not is_valid:
                return JSONResponse (
                
                        status_code = status.HTTP_400_BAD_REQUEST,
                        content = {
                                "status":status.HTTP_400_BAD_REQUEST,
                                "msg" : msg
                        
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
                                "msg" : ResponseSignal.FILE_UPLOAD_FAILED
                        
                }
                )

                         
                 project_dir_path = ProjectController().get_project_path(project_id=project_id)
                 return JSONResponse (
                                
                                status_code = status.HTTP_200_OK,
                                content = {
                                        "status":status.HTTP_200_OK,
                                        "msg" : msg
                                }
                        )
        


                        

