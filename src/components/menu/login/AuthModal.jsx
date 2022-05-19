import { Icon } from "@iconify/react";
import React from "react";

import { useDispatch } from "react-redux";
import styles from "./_Login.module.scss";
import NaverLoginImage from "../../../image/naver_login_image.png";
import KaKaoLoginImage from "../../../image/kakao_login_image.png";
import GoogleLoginImage from "../../../image/google_login_image.png";
import { KAKAO_AUTH_URL } from "./KAKAO_AUTH_URL";
import { GOOGLE_AUTH_URL } from "./GOOGLE_AUTH_URL";
import { setOpenLoginReducer } from "../../../redux/Slice/modalSlice";

const AuthModal = () => {
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(setOpenLoginReducer(false));
  };
  return (
    <>
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <Icon className={styles.modal_icon} icon="octicon:x-16" />
        </div>
        <div className={styles.modal_contents}>
          <div>
            <div className={styles.modal_logo}>
              <Icon
                className="main_logo"
                icon="bi:kanban"
                color="#545454"
                height="70"
              />
              <div>Kanban</div>
            </div>
            <div>로그인</div>
          </div>
          <div className={styles.modal_info}>
            간편하게 구글, 네이버, 카카오로 간편하게 3초만에 시작해보세요
          </div>

          <div className={styles.modal_login_form}>
            <div>
              <a href={GOOGLE_AUTH_URL}>
                <img src={GoogleLoginImage} alt="google_login" />
              </a>
            </div>
            <div>
              <a href={"http://3.37.231.161:4000/oauth/naver"}>
                <img src={NaverLoginImage} alt="naver_login" />
              </a>
            </div>
            <div>
              <a href={KAKAO_AUTH_URL}>
                <img src={KaKaoLoginImage} alt="kakao_login" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.modal_overlay}
        aria-hidden="true"
        onClick={openLoginModal}
      />
    </>
  );
};

export default AuthModal;