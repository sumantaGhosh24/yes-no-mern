import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const entryAdapter = createEntityAdapter();

const initialState: any = entryAdapter.getInitialState();

export const entryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEntrys: builder.query({
      query: ({page, sort, category, search}) =>
        `/admins/entrys?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedEntry = responseData.map((entry: any) => {
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
    getQuestionEntrys: builder.query({
      query: ({page, sort, category, search, id}) =>
        `/entrys/questions/${id}?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedEntry = responseData.map((entry: any) => {
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
    getUserEntrys: builder.query({
      query: ({page, sort, category, search, id}) =>
        `/entrys/user/${id}?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedEntry = responseData.map((entry: any) => {
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
      query: ({page, sort, category, search}) =>
        `/entrys?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedEntry = responseData.map((entry: any) => {
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

export const {
  // useGetAllEntrysQuery,
  // useGetQuestionEntrysQuery,
  // useGetUserEntrysQuery,
  // useAddEntryMutation,
  // useGetMyEntrysQuery,
} = entryApiSlice;
