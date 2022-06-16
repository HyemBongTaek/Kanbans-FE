import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import { getProject } from "./projects";
import axios from "axios";

//카카오로그인
export const authLogin = createAsyncThunk(
  "user/kakaoLogin",
  async ({ code, types }, thunkAPI) => {
    switch (types) {
      case "kakao": {
        try {
          const res = await axios.get(
            `http://3.37.231.161:4000/oauth/kakao/?code=${code}`
          );
          if (res.data.ok) {
            return res.data;
          }
        } catch (err) {
          console.log(
            "카카오 로그인 도중 에러가 발생하였습니다. 다시 시도해주세요."
          );
          return false;
        }
        break;
      }
      case "google": {
        try {
          const res = await axios.get(
            `http://3.37.231.161:4000/oauth/google/?code=${code}`
          );
          if (res.data.ok) {
            return res.data;
          }
        } catch (err) {
          console.log(
            "구글 로그인 도중 에러가 발생하였습니다. 다시 시도해주세요."
          );
        }
        break;
      }
      case "naver": {
        try {
          const res = await axios.get(
            `http://3.37.231.161:4000/oauth/naver/?code=${code}`
          );
          if (res.data.ok) {
            return res.data;
          }
        } catch (err) {
          console.log("에러");
          return thunkAPI.rejectWithValue();
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
    console.log("회원정보를 불러오는 중에 오류가 발생했습니다.");
    return false;
  }
});

//유저 프로필 이미지 변경
export const changeUserInfo = createAsyncThunk(
  "user/changeProfileImage",
  async ({ formData, nickname, type }, thunkAPI) => {
    console.log(formData);
    try {
      if (type === "changeImage") {
        const res = await Apis({
          url: "/user/profile",
          method: "PATCH",
          data: formData,
        });
        if (res.data.ok) {
          setTimeout(() => {
            return thunkAPI.dispatch(getUserInfo());
          }, 1000);
          return type;
        }
      }
      if (type === "nickname") {
        const res = await Apis({
          url: "/user/profile",
          method: "PATCH",
          data: {
            name: nickname,
          },
        });
        if (res.data.ok) {
          // thunkAPI.dispatch(getProject());
          return { data: res.data, type };
        }
      }
    } catch (err) {
      console.log("프로필 변경중 오류가 발생하였습니다.");
    }
  }
);

// 회원탈퇴
export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (data, thunkAPI) => {
    try {
      const res = await Apis({
        url: "user/sign-out",
        method: "DELETE",
      });
      if (res.data.ok) {
        console.log("회원탈퇴", res.data);
      }
    } catch (err) {
      console.log("회원탈퇴 중 오류가 발생하였습니다.");
    }
  }
);
