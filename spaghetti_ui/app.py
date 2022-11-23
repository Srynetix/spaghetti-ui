import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from . import state
from .router import api_router
from .settings import UI_ASSETS_DIR

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
app.mount("/assets", StaticFiles(directory=UI_ASSETS_DIR), name="assets")


@app.on_event("startup")
async def startup_event() -> None:
    source_path = os.environ.get("SPAGHETTI_SOURCE_PATH")
    if source_path is None:
        raise RuntimeError("Missing source path.")

    state.read_dependencies_from_source_path(Path(source_path))
