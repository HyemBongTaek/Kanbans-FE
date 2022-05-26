import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, authLogin } from "../Async/user";
import { useNavigate } from "react-router-dom";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(authLogin.pending, (state, action) => {});
    builder.addCase(authLogin.fulfilled, (state, action) => {
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload, ["accessToken", "refreshToken"])
      );
      window.location.replace("/");
    });
  },
});

export default UserSlice;
