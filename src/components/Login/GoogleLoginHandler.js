import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/Async/user";

const GoogleLoginHandler = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      authLogin({
        code: code,
        types: "google",
      })
    );
  }, [dispatch, code]);
};

export default GoogleLoginHandler;
