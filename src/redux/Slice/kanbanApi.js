import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Apis from "../apis";

export const kanbanApi = createApi({
  reducerPath: "kanbanApi",
  baseQuery: Apis,
  endpoints: (builder) => ({
    getKanbanList: builder.query({
      query: (projectId) => `/board/${projectId}`,
      invalidatesTags: ["kanbanApi"],
    }),
  }),
});

export const { useGetKanbanListQuery } = kanbanApi;
