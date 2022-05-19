import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../../redux/Async/user";

const KaKaoLoginHandler = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();

  // const getToken = async () => {
  //   try {
  //     const res = await axios.get(
  //       `http://3.37.231.161:4000/oauth/kakao/?code=${code}`
  //     );
  //     localStorage.setItem(
  //       "token",
  //       JSON.stringify(res.data, ["accessToken", "refreshToken"])
  //     );
  //     //로그인 완료되면 메인으로 보냄.
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    dispatch(
      kakaoLogin({
        code: code,
      })
    );
  }, [dispatch]);
};

export default KaKaoLoginHandler;
