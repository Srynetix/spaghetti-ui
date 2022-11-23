from typing import Any

from fastapi import APIRouter
from starlette.responses import FileResponse

from spaghetti_ui.settings import UI_INDEX_PATH

router = APIRouter()


@router.get("/")
async def index() -> Any:
    return FileResponse(UI_INDEX_PATH)
