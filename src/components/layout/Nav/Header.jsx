import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/Async/user";
import styles from "../styles/_Header.module.scss";
import { setOpenLoginReducer } from "../../../redux/Slice/commonSlice";

import AfterLogin from "./Navbar/AfterLogin";
import { getCookie } from "../../menu/login/utils/cookie";

const Header = ({ isOpen, toggleOpen }) => {
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(setOpenLoginReducer(true));
  };
  const token = getCookie("cocoriLogin");
  //로그인 정보 불러오기 토큰이 없을 경우 api에서 인증이 안됐다고 떠서 if에다가 토큰이 있을 경우에만 실행하게 바꾸어줌.
  useEffect(() => {
    if (token) {
      dispatch(setOpenLoginReducer());
      dispatch(getUserInfo());
    }
  }, [getUserInfo]);

  return (
    <nav className={styles.header}>
      {/*로그인 되어있지 않으면 보이지 않게 가려놓음*/}
      {token && (
        <div className={styles.header_login}>
          <AfterLogin isOpen={isOpen} toggleOpen={toggleOpen} />
        </div>
      )}
      {!token && (
        <>
          <nav className={styles.header_not_login}>
            <button className={styles.button} onClick={openLoginModal}>
              <Icon className={styles.icon} icon="clarity:login-line" />
              login
            </button>
            <button className={styles.button} onClick={openLoginModal}>
              <Icon className={styles.icon} icon="clarity:login-solid" />
              signup
            </button>
          </nav>
        </>
      )}
    </nav>
  );
};

export default Header;
