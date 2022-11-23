import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import reportParametersReducer from "./parameters";
import uiReducer from "./ui";
import { spaghettiApi } from "../api";

export const store = configureStore({
  reducer: {
    reportParameters: reportParametersReducer,
    ui: uiReducer,
    [spaghettiApi.reducerPath]: spaghettiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spaghettiApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
