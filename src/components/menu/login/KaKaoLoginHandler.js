import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin, kakaoLogin } from "../../../redux/Async/user";

const KaKaoLoginHandler = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log("아아아아아아아아앙");
  console.log("code", code);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      authLogin({
        code: code,
        types: "kakao",
      })
    );
  }, [dispatch, code]);
};

export default KaKaoLoginHandler;
