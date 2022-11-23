export type SpaghettiDependenciesData = Record<string, string[]>;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReportParameters } from "../store/parameters";

export const SPAGHETTI_API_URL = "http://localhost:8000"

export const spaghettiApi = createApi({
  reducerPath: "spaghettiApi",
  baseQuery: fetchBaseQuery({ baseUrl: SPAGHETTI_API_URL }),
  endpoints: (builder) => ({
    dependencies: builder.query<SpaghettiDependenciesData, ReportParameters>({
      query: (parameters) => {
        return {
          url: "dependencies",
          params: parameters,
        };
      },
    }),
  }),
});

export const { useDependenciesQuery } = spaghettiApi;
