from pydantic import BaseModel
from typing import Optional

class AnalysisTaskMessage(BaseModel):
    taskId: str
    imageUrl: str
    targetCalories: Optional[int] = None
    userId: str