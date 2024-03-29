import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, authLogin, changeUserInfo } from "../Async/user";
import { setCookie } from "../../components/Login/utils/cookie";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    isFetching: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        const refreshToken = action.payload.refreshToken;
        const accessToken = action.payload.accessToken;
        const expires = new Date();
        expires.setDate(expires.getDate() + 14);
        setCookie("cocoriLogin", refreshToken, {
          path: "/",
          expires,
        });

        localStorage.setItem("token", JSON.stringify(accessToken));
        window.location.replace("/");
      })
      .addCase(changeUserInfo.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(changeUserInfo.fulfilled, (state, action) => {
        state.isFetching = false;

        switch (action.payload) {
          case "changeImage": {
            break;
          }
          case "nickname": {
            state.userInfo.name = action.payload.data.name;
            break;
          }
        }
      });
  },
});

export default UserSlice;
