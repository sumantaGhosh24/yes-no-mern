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
        url: "/verification",
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
      query: ({page, sort, category, search}) =>
        `/wallet?limit=${page * 9}&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedWallet = responseData.map((wallet: any) => {
          wallet.id = wallet._id;
          return wallet;
        });
        return walletAdapter.setAll(initialState, loadedWallet);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Wallet", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Wallet", id})),
          ];
        } else return [{type: "Wallet", id: "LIST"}];
      },
    }),
    getWalletById: builder.query({
      query: ({page, sort, category, search, id}) =>
        `/wallet/${id}?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedWallet = responseData.map((wallet: any) => {
          wallet.id = wallet._id;
          return wallet;
        });
        return walletAdapter.setAll(initialState, loadedWallet);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Wallet", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Wallet", id})),
          ];
        } else return [{type: "Wallet", id: "LIST"}];
      },
    }),
    getAllTransactions: builder.query({
      query: ({page, sort, category, search}) =>
        `/all-transactions?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`,
      transformResponse: (responseData) => {
        const loadedWallet = responseData.map((wallet: any) => {
          wallet.id = wallet._id;
          return wallet;
        });
        return walletAdapter.setAll(initialState, loadedWallet);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            {type: "Transactions", id: "LIST"},
            ...result.ids.map((id: any) => ({type: "Transactions", id})),
          ];
        } else return [{type: "Transactions", id: "LIST"}];
      },
    }),
    penalty: builder.mutation({
      query: (credentials) => ({
        url: `/penalty/${credentials.id}`,
        method: "POST",
        body: {...credentials},
      }),
    }),
  }),
});

export const {
  // useDepositMutation,
  // useGetAllTransactionsQuery,
  // useGetWalletByIdQuery,
  // useGetWalletQuery,
  // usePenaltyMutation,
  // useVerificationMutation,
  // useWithdrawMutation,
} = walletApiSlice;
