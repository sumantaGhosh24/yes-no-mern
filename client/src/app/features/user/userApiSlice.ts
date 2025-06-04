import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState: any = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userImage: builder.mutation({
      query: (data) => ({
        url: "/user-image",
        method: "PUT",
        body: {...data},
      }),
      invalidatesTags: (_result, _error, arg) => [{type: "User", id: arg.id}],
    }),
    userData: builder.mutation({
      query: (data) => ({
        url: "/user-data",
        method: "PUT",
        body: {...data},
      }),
      invalidatesTags: (_result, _error, arg) => [{type: "User", id: arg.id}],
    }),
    userAddress: builder.mutation({
      query: (data) => ({
        url: "/user-address",
        method: "PUT",
        body: {...data},
      }),
      invalidatesTags: (_result, _error, arg) => [{type: "User", id: arg.id}],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: {...data},
      }),
      invalidatesTags: (_result, _error, arg) => [{type: "User", id: arg.id}],
    }),
    getAllUser: builder.query({
      query: ({page}) => `/users?limit=${page * 9}`,
      transformResponse: (responseData) => {
        const loadedUser = responseData.users.map((user: any) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialState, loadedUser);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "User", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "User", id})),
          ];
        } else return [{type: "User", id: "LIST"}];
      },
    }),
    getAdminDashboard: builder.query({
      query: () => "/admin/dashboard",
      transformResponse: (response) => response,
    }),
    getDashboard: builder.query({
      query: () => "/dashboard",
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useUserImageMutation,
  useUserDataMutation,
  useUserAddressMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
  useGetAdminDashboardQuery,
  useGetDashboardQuery,
} = userApiSlice;
