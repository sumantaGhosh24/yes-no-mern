import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const categoryAdapter = createEntityAdapter();

const initialState: any = categoryAdapter.getInitialState();

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/category`,
      transformResponse: (responseData) => {
        const loadedCategory = responseData.map((category: any) => {
          category.id = category._id;
          return category;
        });
        return categoryAdapter.setAll(initialState, loadedCategory);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Category", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Category", id})),
          ];
        } else return [{type: "Category", id: "LIST"}];
      },
    }),
    createCategory: builder.mutation({
      query: (credentials) => ({
        url: "/category",
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Category", id: "LIST"}],
    }),
    updateCategory: builder.mutation({
      query: (initialCategory) => ({
        url: `/category/${initialCategory.id}`,
        method: "PUT",
        body: {
          ...initialCategory,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [
        {type: "Category", id: arg.id},
      ],
    }),
    deleteCategory: builder.mutation({
      query: ({id}) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        {type: "Category", id: arg.id},
      ],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice;
