import { createSlice } from "@reduxjs/toolkit";
import LocalStorageHelper from "../../services/LocalStorageHelper";

const initialState = {
  IsLoggedIn: false,
  Email: null,
  password: null
};

const LoginSlice = createSlice({
  name: "LoginSlice",
  initialState,
  reducers: {
    LoginAction: (state, action) => {
      const { username } = action.payload;
      state.IsLoggedIn = true;
      LocalStorageHelper.setItem("username", username);
    },
    LogOutAction: (state) => {
      state.IsLoggedIn = false;
      LocalStorageHelper.removeItem("username");

    },
  },
});

export const {
  LoginAction,
  LogOutAction
} = LoginSlice.actions;

export default LoginSlice.reducer;
