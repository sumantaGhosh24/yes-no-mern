import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const questionAdapter = createEntityAdapter();

const initialState: any = questionAdapter.getInitialState();

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionsAdmin: builder.query({
      query: ({page, sort, category, search}) =>
        `/admins/questions?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedQuestion = responseData.map((question: any) => {
          question.id = question._id;
          return question;
        });
        return questionAdapter.setAll(initialState, loadedQuestion);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Question", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Question", id})),
          ];
        } else return [{type: "Question", id: "LIST"}];
      },
    }),
    createQuestion: builder.mutation({
      query: (credentials) => ({
        url: "/question",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Question", id: "LIST"}],
    }),
    updateQuestion: builder.mutation({
      query: (initialQuestion) => ({
        url: `/question/${initialQuestion.id}`,
        method: "PUT",
        body: {
          ...initialQuestion,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        {type: "Question", id: arg.id},
      ],
    }),
    deleteQuestion: builder.mutation({
      query: ({id}) => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        {type: "Question", id: arg.id},
      ],
    }),
    getQuestions: builder.query({
      query: ({page, sort, category, search}) =>
        `/questions?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedQuestion = responseData.map((question: any) => {
          question.id = question._id;
          return question;
        });
        return questionAdapter.setAll(initialState, loadedQuestion);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Question", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Question", id})),
          ];
        } else return [{type: "Question", id: "LIST"}];
      },
    }),
    declareResult: builder.mutation({
      query: (credentials) => ({
        url: `/question/result/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Question", id: "LIST"}],
    }),
  }),
});

export const {
  // useGetQuestionsAdminQuery,
  // useCreateQuestionMutation,
  // useUpdateQuestionMutation,
  // useDeleteQuestionMutation,
  // useGetQuestionsQuery,
  // useDeclareResultMutation,
} = questionApiSlice;
