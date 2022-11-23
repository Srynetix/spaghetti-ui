import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ReportParameters {
  excludedPatterns: string[];
  filteredPatterns: string[];
  maxDepth: number;
  stripNonLocalModules: boolean;
  hideModulesWithoutLinks: boolean;
  showUnfilteredDependencies: boolean;
  showUnfilteredReverseDependencies: boolean;
}

const initialState: ReportParameters = {
  excludedPatterns: [],
  filteredPatterns: [],
  maxDepth: 0,
  stripNonLocalModules: true,
  hideModulesWithoutLinks: true,
  showUnfilteredDependencies: true,
  showUnfilteredReverseDependencies: true,
};

export const reportParametersSlice = createSlice({
  name: "reportParameters",
  initialState,
  reducers: {
    setExcludedPatterns: (state, action: PayloadAction<string[]>) => {
      state.excludedPatterns = action.payload;
    },
    setFilteredPatterns: (state, action: PayloadAction<string[]>) => {
      state.filteredPatterns = action.payload;
    },
    setMaxDepth: (state, action: PayloadAction<number>) => {
      state.maxDepth = action.payload;
    },
    setHideModulesWithoutLinks: (state, action: PayloadAction<boolean>) => {
      state.hideModulesWithoutLinks = action.payload;
    },
    setStripNonLocalModules: (state, action: PayloadAction<boolean>) => {
      state.stripNonLocalModules = action.payload;
    },
    setShowUnfilteredDependencies: (state, action: PayloadAction<boolean>) => {
      state.showUnfilteredDependencies = action.payload;
    },
    setShowUnfilteredReverseDependencies: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showUnfilteredReverseDependencies = action.payload;
    },
  },
});

export const {
  setExcludedPatterns,
  setFilteredPatterns,
  setMaxDepth,
  setHideModulesWithoutLinks,
  setStripNonLocalModules,
  setShowUnfilteredDependencies,
  setShowUnfilteredReverseDependencies,
} = reportParametersSlice.actions;
export default reportParametersSlice.reducer;
