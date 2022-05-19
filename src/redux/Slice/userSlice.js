import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, kakaoLogin } from "../Async/user";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    // isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(kakaoLogin.pending, (state, action) => {
      state.isLoading = true;
      // localStorage.setItem(
      //   "token",
      //   JSON.stringify(res.data, ["accessToken", "refreshToken"])
      // )
    });
    builder.addCase(kakaoLogin.fulfilled, (state, action) => {
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload, ["accessToken", "refreshToken"])
      );
      state.isLoading = false;
      //고민해볼것
      window.location.replace("/");
    });
  },
});

export default UserSlice;
