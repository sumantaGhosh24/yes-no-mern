import {apiSlice} from "../../api/apiSlice";
import {setCredentials, logout} from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: {...credentials},
      }),
    }),
    registerVerify: builder.mutation({
      query: (token) => ({
        url: `/register-verify?token=${token}`,
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: {...credentials},
      }),
    }),
    loginVerify: builder.mutation({
      query: (credentials) => ({
        url: "/login-verify",
        method: "POST",
        body: {...credentials},
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      async onQueryStarted(_arg, {dispatch}) {
        try {
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh_token",
        method: "GET",
      }),
      async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/forgot-password",
        method: "POST",
        body: {...credentials},
      }),
    }),
    validateConfirmForgotPassword: builder.mutation({
      query: (token) => ({
        url: `/validate-confirm-forgot-password?token=${token}`,
        method: "GET",
      }),
    }),
    confirmForgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/confirm-forgot-password",
        method: "POST",
        body: {...credentials},
      }),
    }),
  }),
});

export const {
  useRefreshMutation,
  useRegisterVerifyMutation,
  useLoginMutation,
  useLoginVerifyMutation,
  useSendLogoutMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useValidateConfirmForgotPasswordMutation,
  useConfirmForgotPasswordMutation,
} = authApiSlice;
