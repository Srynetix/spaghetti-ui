import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type RenderMode = "2d" | "3d";

export interface UiParameters {
  collapsed: boolean;
  maxNodesToDisplay: number;
  colorizeFilteredModules: boolean;
  renderMode: RenderMode;
}

const initialState: UiParameters = {
  collapsed: false,
  maxNodesToDisplay: 300,
  colorizeFilteredModules: true,
  renderMode: "3d",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setMaxNodesToDisplay: (state, action: PayloadAction<number>) => {
      state.maxNodesToDisplay = action.payload;
    },
    setColorizeFilteredModules: (state, action: PayloadAction<boolean>) => {
      state.colorizeFilteredModules = action.payload;
    },
    setRenderMode: (state, action: PayloadAction<RenderMode>) => {
      state.renderMode = action.payload;
    },
  },
});

export const {
  setCollapsed,
  setMaxNodesToDisplay,
  setColorizeFilteredModules,
  setRenderMode,
} = uiSlice.actions;
export default uiSlice.reducer;
