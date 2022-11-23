import json
from typing import Any

from fastapi import APIRouter
from spaghetti.filtering.implementations.configurable import ConfigurableFilter
from spaghetti.serialization.implementations.json_serializer import (
    ProjectDependenciesJsonSerializer,
)

from spaghetti_ui import state

router = APIRouter()


@router.get("/dependencies")
async def dependencies(
    filteredPatterns: str = "",
    excludedPatterns: str = "",
    maxDepth: int = 0,
    hideModulesWithoutLinks: bool = True,
    stripNonLocalModules: bool = True,
    showUnfilteredDependencies: bool = True,
    showUnfilteredReverseDependencies: bool = True,
) -> Any:
    filtered_patterns = {pat for pat in filteredPatterns.split(",") if pat}
    excluded_patterns = {pat for pat in excludedPatterns.split(",") if pat}
    dependencies = state.get_loaded_dependencies()

    configurable_filter = ConfigurableFilter(
        excluded_patterns=excluded_patterns,
        filtered_patterns=filtered_patterns,
        show_unfiltered_dependencies=showUnfilteredDependencies,
        show_unfiltered_reverse_dependencies=showUnfilteredReverseDependencies,
        max_depth=maxDepth,
        hide_modules_without_links=hideModulesWithoutLinks,
        strip_non_local_modules=stripNonLocalModules,
    )

    serializer = ProjectDependenciesJsonSerializer()
    return json.loads(serializer.serialize(configurable_filter.apply_filter(dependencies)))
