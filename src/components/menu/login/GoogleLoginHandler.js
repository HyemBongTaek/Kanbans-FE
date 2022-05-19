import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GoogleLoginHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () => {
    try {
      const res = await axios.get(
        `http://3.37.231.161:4000/oauth/google/?code=${code}`
      );
      localStorage.setItem(
        "token",
        JSON.stringify(res.data, ["accessToken", "refreshToken"])
      );
      //로그인 완료되면 메인으로 보냄.
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
};
