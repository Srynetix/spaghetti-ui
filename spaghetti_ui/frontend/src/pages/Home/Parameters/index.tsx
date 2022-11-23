import classes from "./style.module.scss";
import {
  Button,
  Collapse,
  FormGroup,
  HTMLSelect,
  NumericInput,
  Switch,
  TagInput,
} from "@blueprintjs/core";
import {
  setMaxDepth,
  setExcludedPatterns,
  setFilteredPatterns,
  setStripNonLocalModules,
  setShowUnfilteredDependencies,
  setShowUnfilteredReverseDependencies,
  setHideModulesWithoutLinks,
} from "../../../store/parameters";
import {
  RenderMode,
  setCollapsed,
  setColorizeFilteredModules,
  setMaxNodesToDisplay,
  setRenderMode,
} from "../../../store/ui";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const Parameters = () => {
  const excludedPatterns = useAppSelector(
    (state) => state.reportParameters.excludedPatterns
  );
  const filteredPatterns = useAppSelector(
    (state) => state.reportParameters.filteredPatterns
  );
  const maxDepth = useAppSelector((state) => state.reportParameters.maxDepth);
  const hideModulesWithoutLinks = useAppSelector(
    (state) => state.reportParameters.hideModulesWithoutLinks
  );
  const stripNonLocalModules = useAppSelector(
    (state) => state.reportParameters.stripNonLocalModules
  );
  const showUnfilteredDependencies = useAppSelector(
    (state) => state.reportParameters.showUnfilteredDependencies
  );
  const showUnfilteredReverseDependencies = useAppSelector(
    (state) => state.reportParameters.showUnfilteredReverseDependencies
  );
  const collapsed = useAppSelector((state) => state.ui.collapsed);
  const maxNodesToDisplay = useAppSelector(
    (state) => state.ui.maxNodesToDisplay
  );
  const colorizeFilteredModules = useAppSelector(
    (state) => state.ui.colorizeFilteredModules
  );
  const renderMode = useAppSelector((state) => state.ui.renderMode);
  const dispatch = useAppDispatch();

  const toggleCollapsed = () => {
    dispatch(setCollapsed(!collapsed));
  };

  return (
    <div className={classes.parameters}>
      <div className={classes.container}>
        <p>
          <Button onClick={() => toggleCollapsed()}>
            {collapsed ? "Show" : "Hide"} parameters
          </Button>
        </p>

        <Collapse isOpen={!collapsed} className={classes.form}>
          <FormGroup
            inline
            contentClassName={classes.formgroup}
            label="Exclude patterns"
          >
            <TagInput
              placeholder="Patterns to exclude"
              addOnBlur
              onChange={(values) => {
                dispatch(setExcludedPatterns(values.map((x) => x as string)));
              }}
              values={excludedPatterns}
            />
          </FormGroup>
          <FormGroup
            inline
            contentClassName={classes.formgroup}
            label="Filter patterns"
          >
            <TagInput
              placeholder="Patterns to filter"
              addOnBlur
              onChange={(values) => {
                dispatch(setFilteredPatterns(values.map((x) => x as string)));
              }}
              values={filteredPatterns}
            />
          </FormGroup>
          <FormGroup
            inline
            contentClassName={classes.formgroup}
            label="Limit module depth"
          >
            <NumericInput
              placeholder="Max depth"
              onValueChange={(value) => {
                dispatch(setMaxDepth(value));
              }}
              value={maxDepth}
            />
          </FormGroup>
          <div className={classes.switches}>
            <div className={classes.switchesGroup}>
              <Switch
                label="Hide modules without links"
                onChange={() => {
                  dispatch(
                    setHideModulesWithoutLinks(!hideModulesWithoutLinks)
                  );
                }}
                checked={hideModulesWithoutLinks}
              />
              <Switch
                label="Strip non-local modules"
                onChange={() => {
                  dispatch(setStripNonLocalModules(!stripNonLocalModules));
                }}
                checked={stripNonLocalModules}
              />
              <Switch
                label="Show unfiltered dependencies"
                onChange={() => {
                  dispatch(
                    setShowUnfilteredDependencies(!showUnfilteredDependencies)
                  );
                }}
                checked={showUnfilteredDependencies}
              />
              <Switch
                label="Show unfiltered reverse dependencies"
                onChange={() => {
                  dispatch(
                    setShowUnfilteredReverseDependencies(
                      !showUnfilteredReverseDependencies
                    )
                  );
                }}
                checked={showUnfilteredReverseDependencies}
              />
            </div>
            <div className={classes.switchesGroup}>
              <Switch
                label="Colorize filtered modules"
                onChange={() => {
                  dispatch(
                    setColorizeFilteredModules(!colorizeFilteredModules)
                  );
                }}
                checked={colorizeFilteredModules}
              />
              <FormGroup
                inline
                contentClassName={classes.formgroup}
                label="Render type"
              >
                <HTMLSelect
                  value={renderMode}
                  onChange={(event) => {
                    dispatch(setRenderMode(event.target.value as RenderMode));
                  }}
                >
                  <option value="2d">2D</option>
                  <option value="3d">3D</option>
                </HTMLSelect>
              </FormGroup>
              <FormGroup
                inline
                contentClassName={classes.formgroup}
                label="Max nodes to display"
              >
                <NumericInput
                  placeholder="Max nodes to display"
                  onValueChange={(value) => {
                    dispatch(setMaxNodesToDisplay(value));
                  }}
                  value={maxNodesToDisplay}
                />
              </FormGroup>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Parameters;
