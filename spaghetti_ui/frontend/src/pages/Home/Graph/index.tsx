import classes from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { SPAGHETTI_API_URL, useDependenciesQuery } from "../../../api";
import { useAppSelector, useWindowSize } from "../../../hooks";
import { cloneDeep } from "lodash";
import { GraphWrapper } from "../../../graph";
import { Icon, Spinner } from "@blueprintjs/core";
import Graph2d from "./Graph2d";
import Graph3d from "./Graph3d";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

const renderError = (error: FetchBaseQueryError | SerializedError) => {
  const queryError = error as FetchBaseQueryError;

  return (
    <div className={classes.error}>
      <p>
        <Icon icon={"error"} size={34} />
      </p>
      <p>
        <b>Error status:</b> <b>{queryError.status}</b>
      </p>
      <p>
        <b>{renderErrorMessage(queryError)}</b>
      </p>
    </div>
  );
};

const renderErrorMessage = (error: FetchBaseQueryError) => {
  if (error.status == "FETCH_ERROR") {
    return `Make sure the server at URL ${SPAGHETTI_API_URL} is responding.`;
  }
};

const renderLoading = () => {
  return (
    <div className={classes.loading}>
      <Spinner />
      <br />
      <p>Loading...</p>
    </div>
  );
};

const renderOverload = (nodeCount: number, limit: number) => {
  return (
    <div className={classes.overload}>
      <p>
        <Icon icon={"warning-sign"} size={34} />
      </p>
      <p>
        Too many nodes: <b>{nodeCount}</b>
      </p>
      <p>
        Maximum nodes count: <b>{limit}</b>
      </p>
      <p>Please add filters or increase the maximum nodes count to display.</p>
    </div>
  );
};

const renderGraph3d = (
  graph: GraphWrapper,
  width: number,
  height: number,
  filteredPatterns: string[],
  colorizeFilteredModules: boolean
) => {
  return (
    <Graph3d
      graph={graph}
      width={width}
      height={height}
      filteredPatterns={filteredPatterns}
      colorizeFilteredModules={colorizeFilteredModules}
    />
  );
};

const renderGraph2d = (
  graph: GraphWrapper,
  width: number,
  height: number,
  filteredPatterns: string[],
  colorizeFilteredModules: boolean
) => {
  return (
    <Graph2d
      graph={graph}
      width={width}
      height={height}
      filteredPatterns={filteredPatterns}
      colorizeFilteredModules={colorizeFilteredModules}
    />
  );
};

const Graph = () => {
  const ref = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const reportParameters = useAppSelector((state) => state.reportParameters);
  const uiCollapsed = useAppSelector((state) => state.ui.collapsed);
  const maxNodesToDisplay = useAppSelector(
    (state) => state.ui.maxNodesToDisplay
  );
  const filteredPatterns = useAppSelector(
    (state) => state.reportParameters.filteredPatterns
  );
  const colorizeFilteredModules = useAppSelector(
    (state) => state.ui.colorizeFilteredModules
  );
  const renderMode = useAppSelector((state) => state.ui.renderMode);

  // Update render size on window resize
  useEffect(() => {
    const parent = ref.current;
    if (parent) {
      setVisible(false);

      setTimeout(() => {
        setWidth(parent.clientWidth);
        setHeight(parent.clientHeight);
        setVisible(true);
      }, 500);
    }
  }, [windowSize, uiCollapsed]);

  const { data, error, isLoading } = useDependenciesQuery(reportParameters);

  let graph: GraphWrapper | null = null;
  if (data) {
    graph = new GraphWrapper(cloneDeep(data));
  }

  return (
    <div className={classes.graph} ref={ref}>
      {error
        ? renderError(error)
        : isLoading || !visible || !graph
        ? renderLoading()
        : data
        ? graph.getNodeCount() < maxNodesToDisplay
          ? renderMode == "3d"
            ? renderGraph3d(
                graph,
                width,
                height,
                filteredPatterns,
                colorizeFilteredModules
              )
            : renderGraph2d(
                graph,
                width,
                height,
                filteredPatterns,
                colorizeFilteredModules
              )
          : renderOverload(graph.getNodeCount(), maxNodesToDisplay)
        : null}
    </div>
  );
};

export default Graph;
