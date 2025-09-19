from pydantic import BaseModel,Filed, validator
from typing import optional
from bosn.objectid import ObjectId

class Project(BaseModel):
    _id:optional[ObjectId]
    project_id: str = Filed(..., min_length = 1)

    @validator("project_id")
    def validate_project_id(cls,value):
        if not value.isalnum():
            return ValueError("project_id must be alphanumeric")
        
        return value

    class Config():
        arbitray_types_allowd = True     