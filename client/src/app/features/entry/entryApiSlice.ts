import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const entryAdapter = createEntityAdapter();

const initialState: any = entryAdapter.getInitialState();

export const entryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEntrys: builder.query({
      query: ({page, user, question, sort}) =>
        `/admin/entrys?limit=${page * 9}${user}${question}${sort}`,
      transformResponse: (responseData) => {
        const loadedEntry = responseData.entries.map((entry: any) => {
          entry.id = entry._id;
          return entry;
        });
        return entryAdapter.setAll(initialState, loadedEntry);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Entry", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Entry", id})),
          ];
        } else return [{type: "Entry", id: "LIST"}];
      },
    }),
    getMyEntrys: builder.query({
      query: ({page, sort}) => `/entrys?limit=${page * 9}${sort}`,
      transformResponse: (responseData) => {
        const loadedEntry = responseData.entries.map((entry: any) => {
          entry.id = entry._id;
          return entry;
        });
        return entryAdapter.setAll(initialState, loadedEntry);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Entry", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Entry", id})),
          ];
        } else return [{type: "Entry", id: "LIST"}];
      },
    }),
    addEntry: builder.mutation({
      query: (credentials) => ({
        url: `/question/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Entry", id: "LIST"}],
    }),
  }),
});

export const {useGetAllEntrysQuery, useAddEntryMutation, useGetMyEntrysQuery} =
  entryApiSlice;
