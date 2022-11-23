from fastapi import APIRouter

from .endpoints import dependencies, index

api_router = APIRouter()

api_router.include_router(index.router, tags=["index"])
api_router.include_router(dependencies.router, tags=["graph"])
