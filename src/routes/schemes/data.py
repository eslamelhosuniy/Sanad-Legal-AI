from pydantic import BaseModel
from typing import Optional

class ProcessRequest(BaseModel):
    file_id:str
    Chunk_size: Optional[int] = 100
    Overlap_size : Optional[int] = 20
    do_resrt:Optional[int]=0