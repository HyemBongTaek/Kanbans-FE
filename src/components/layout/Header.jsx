import React, { useEffect, useRef, useState } from "react";
import LeftNav from "./LeftNav";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/Async/user";
import styles from "./styles/_Header.module.scss";
import { setOpenLoginReducer } from "../../redux/Slice/modalSlice";

const Header = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navHandler = () => {
    setIsOpen(!isOpen);
  };

  const userInfo = useSelector((state) => state.UserSlice.userInfo);
  const isLoading = useSelector((state) => state.userSlice);
  console.log("이즈로딩", isLoading);

  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  const openLoginModal = () => {
    dispatch(setOpenLoginReducer(true));
  };
  //로그인 정보 불러오기
  useEffect(() => {
    dispatch(setOpenLoginReducer());
    dispatch(getUserInfo());
  }, [dispatch, getUserInfo]);

  return (
    <div className={styles.header}>
      {/*로그인 되어있지 않으면 보이지 않게 가려놓음*/}
      {userInfo && (
        <>
          <div className={styles.header_login}>
            <div onClick={navHandler}>
              <Icon className={styles.icon} icon="heroicons-outline:menu" />
            </div>
            <button onClick={logoutHandler}>
              <Icon className={styles.icon} icon="clarity:logout-line" />
              Logout
            </button>
          </div>
          <div className={styles.header_login}>
            {isOpen && <LeftNav items={userInfo} />}
          </div>
        </>
      )}
      {!userInfo && (
        <>
          <div className={styles.header_not_login}>
            <button onClick={openLoginModal}>
              <Icon className={styles.icon} icon="clarity:login-line" />
              login
            </button>
            <button>
              <Icon className={styles.icon} icon="clarity:login-solid" />
              signup
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
