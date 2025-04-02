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
      const {  accessToken, refreshToken, user } = action.payload;
      state.IsLoggedIn = true;
      state.userDetails = user
      LocalStorageHelper.setItem("user", user);
      LocalStorageHelper.setItem("accessToken", accessToken);
      LocalStorageHelper.setItem("refreshToken", refreshToken);

    },
    RefreshLoginAction: (state, action) => {
      const { accessToken } = action.payload;
      state.IsLoggedIn = true;
      LocalStorageHelper.setItem("accessToken", accessToken);
    },
    LogOutAction: (state) => {
      state.IsLoggedIn = false;
      state.userDetails = {}
      LocalStorageHelper.setItem("user");
      LocalStorageHelper.setItem("accessToken");
      LocalStorageHelper.setItem("refreshToken");
    },
  },
});

export const {
  LoginAction,
  LogOutAction,
  RefreshLoginAction
} = LoginSlice.actions;

export default LoginSlice.reducer;
