import React from "react";
import { useDispatch } from "react-redux";
import styles from "./_AuthModal.module.scss";
import NaverLoginImage from "../../../static/image/naver_login_image.png";

import { Icon } from "@iconify/react";
import KaKaoLoginImage from "../../../static/image/kakao_login_image.png";
import GoogleLoginImage from "../../../static/image/google_login_image.png";
import { KAKAO_AUTH_URL } from "./AUTH_URL";
import { NAVER_AUTH_URL } from "./AUTH_URL";
import { GOOGLE_AUTH_URL } from "./AUTH_URL";
import Logo from "../../../static/image/cocori02.png";

import { setOpenLoginReducer } from "../../../redux/Slice/commonSlice";

const AuthModal = () => {
  const dispatch = useDispatch();

  const openLoginModal = () => {
    dispatch(setOpenLoginReducer(false));
  };
  return (
    <>
      <div className={styles.login_modal}>
        <div className={styles.modal_header}>
          <Icon
            className={styles.modal_icon}
            onClick={openLoginModal}
            icon="octicon:x-16"
          />
        </div>

        <div className={styles.modal_container}>
          <div className={styles.modal_logo}>
            <img src={Logo} alt="코코리 로고" />
          </div>
          <div className={styles.login_text}>로그인</div>
        </div>
        <div className={styles.modal_info}>
          간편하게 구글, 네이버, 카카오로 간편하게 3초만에 시작해보세요
        </div>

        <div className={styles.modal_login_form}>
          <button>
            <a href={GOOGLE_AUTH_URL}>
              <img src={GoogleLoginImage} alt="google_login" />
            </a>
          </button>
          <button>
            <a href={NAVER_AUTH_URL}>
              <img src={NaverLoginImage} alt="naver_login" />
            </a>
          </button>
          <button>
            <a href={KAKAO_AUTH_URL}>
              <img src={KaKaoLoginImage} alt="kakao_login" />
            </a>
          </button>
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
