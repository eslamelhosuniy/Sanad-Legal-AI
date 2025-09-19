from pydantic import BaseModel,Filed, validator
from typing import optional
from bosn.objectid import ObjectId

class DataChunk(BaseModel):
    _id:optional[ObjectId]
    chunk_text : str = Filed(..., min_length =1)
    chunk_metadat : dict
    chunk_order : int = Filed(..., gt = 0)    
    chunk_project_id : ObjectId
    
    @validator("project_id")
    def validate_project_id(cls,value):
        if not value.isalnum():
            return ValueError("project_id must be alphanumeric")
        
        return value

    class Config():
        arbitray_types_allowd = True     