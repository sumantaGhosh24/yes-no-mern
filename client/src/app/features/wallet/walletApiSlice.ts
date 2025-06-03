import {createEntityAdapter} from "@reduxjs/toolkit";

import {apiSlice} from "../../api/apiSlice";

const walletAdapter = createEntityAdapter();

const initialState: any = walletAdapter.getInitialState();

export const walletApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deposit: builder.mutation({
      query: (credentials) => ({
        url: "/deposit",
        method: "POST",
        body: {...credentials},
      }),
    }),
    verification: builder.mutation({
      query: (credentials) => ({
        url: "/verify",
        method: "POST",
        body: {...credentials},
      }),
    }),
    withdraw: builder.mutation({
      query: (credentials) => ({
        url: "/withdraw",
        method: "POST",
        body: {...credentials},
      }),
    }),
    getWallet: builder.query({
      query: ({page, sort, category}) =>
        `/wallet?limit=${page * 9}${category}${sort}`,
      transformResponse: (responseData) => {
        const loadedWallet = responseData.transactions.map((wallet: any) => {
          wallet.id = wallet._id;
          return wallet;
        });
        return walletAdapter.setAll(initialState, loadedWallet);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Transaction", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Transaction", id})),
          ];
        } else return [{type: "Transaction", id: "LIST"}];
      },
    }),
    getAllTransactions: builder.query({
      query: ({page, sort, category}) =>
        `/all-transactions?limit=${page * 9}${category}${sort}`,
      transformResponse: (responseData) => {
        const loadedWallet = responseData.transactions.map((wallet: any) => {
          wallet.id = wallet._id;
          return wallet;
        });
        return walletAdapter.setAll(initialState, loadedWallet);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Transaction", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Transaction", id})),
          ];
        } else return [{type: "Transaction", id: "LIST"}];
      },
    }),
    penalty: builder.mutation({
      query: (credentials) => ({
        url: `/penalty/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
      invalidatesTags: [{type: "Transaction", id: "LIST"}],
    }),
  }),
});

export const {
  useDepositMutation,
  useVerificationMutation,
  useWithdrawMutation,
  useGetWalletQuery,
  useGetAllTransactionsQuery,
  usePenaltyMutation,
} = walletApiSlice;
