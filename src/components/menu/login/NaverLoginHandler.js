import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "../../../redux/Async/user";

const NaverLoginHandler = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      authLogin({
        types: "naver",
        code: code,
      })
    );
  }, [dispatch, code]);
};

export default NaverLoginHandler;
