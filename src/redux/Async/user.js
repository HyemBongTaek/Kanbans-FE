import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import axios from "axios";

//카카오로그인
export const authLogin = createAsyncThunk(
  "user/kakaoLogin",
  async ({ code, types }, thunkAPI) => {
    const baseURL = "https://cocorikanbans.site/oauth";
    switch (types) {
      case "kakao": {
        try {
          const res = await axios.get(`${baseURL}/kakao/?code=${code}`);
          if (res.data.ok) {
            return res.data;
          }
        } catch (err) {
          throw err;
        }
        break;
      }
      case "google": {
        try {
          const res = await axios.get(`${baseURL}/google/?code=${code}`);
          if (res.data.ok) {
            return res.data;
          }
        } catch (err) {
          throw err;
        }
        break;
      }
      case "naver": {
        try {
          const res = await axios.get(`${baseURL}/naver/?code=${code}`);
          if (res.data.ok) {
            return res.data;
          }
        } catch (err) {
          throw err;
        }
      }
    }
  }
);

//로그인한 사람 프로필 가져오기
export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  try {
    const res = await Apis({
      url: "/user/profile",
      method: "GET",
    });
    if (res.data.ok) {
      return res.data.user;
    }
  } catch (err) {
    throw err;
  }
});

//유저 프로필 이미지 변경
export const changeUserInfo = createAsyncThunk(
  "user/changeProfileImage",
  async ({ formData, nickname, type, introduce }, thunkAPI) => {
    try {
      if (type === "changeImage") {
        const res = await Apis({
          url: "/user/profile",
          method: "PATCH",
          data: formData,
        });
        if (res.data.ok) {
          thunkAPI.dispatch(getUserInfo());
        }
        return type;
      } else {
        const res = await Apis({
          url: "/user/profile",
          method: "PATCH",
          data: {
            name: nickname,
            introduce,
          },
        });
        if (res.data.ok) {
          return { data: res.data, type };
        }
      }
    } catch (err) {
      throw err;
    }
  }
);

// 회원탈퇴
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (thunkAPI) => {
    try {
      const res = await Apis({
        url: "user/sign-out",
        method: "DELETE",
      });
    } catch (err) {
      throw err;
    }
  }
);
