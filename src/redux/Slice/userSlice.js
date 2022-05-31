import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, authLogin, changeUserInfo } from "../Async/user";
import { useNavigate } from "react-router-dom";

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
      .addCase(authLogin.pending, (state, action) => {})
      .addCase(authLogin.fulfilled, (state, action) => {
        localStorage.setItem(
          "token",
          JSON.stringify(action.payload, ["accessToken", "refreshToken"])
        );
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
