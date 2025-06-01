import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {token: null, user: null},
  reducers: {
    setCredentials: (state, action) => {
      const {accesstoken, ...data} = action.payload;
      state.token = accesstoken;
      state.user = data;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: any) => state.auth;
