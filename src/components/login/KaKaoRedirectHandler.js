import React, { useEffect } from "react";
import KaKaoLoginImage from "../../image/kakao_login_image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KaKaoRedirectHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("코드드드드드드", code);

  const getToken = async () => {
    try {
      const res = await axios.get(
        `http://3.37.231.161:4000/oauth/kakao/?code=${code}`
      );
      localStorage.setItem(
        "token",
        JSON.stringify(res.data, ["accessToken", "refreshToken"])
      );
      console.log("데이터", res.data.accessToken);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <div>카카오오오오오</div>
    </>
  );
};

export default KaKaoRedirectHandler;
