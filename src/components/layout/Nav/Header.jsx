import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/Async/user";
import styles from "../styles/_Header.module.scss";
import { setOpenLoginReducer } from "../../../redux/Slice/commonSlice";

import AfterLogin from "./Navbar/AfterLogin";

const Header = ({ isOpen, toggleOpen }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userSlice.userInfo);

  const openLoginModal = () => {
    dispatch(setOpenLoginReducer(true));
  };
  //로그인 정보 불러오기
  useEffect(() => {
    dispatch(setOpenLoginReducer());
    dispatch(getUserInfo());
  }, [dispatch, getUserInfo]);

  return (
    <nav className={styles.header}>
      {/*로그인 되어있지 않으면 보이지 않게 가려놓음*/}
      {userInfo && (
        <div className={styles.header_login}>
          <AfterLogin isOpen={isOpen} toggleOpen={toggleOpen} />
        </div>
      )}
      {!userInfo && (
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
