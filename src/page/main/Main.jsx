import React from "react";

import styles from "./_Main.module.scss";
import { useSelector } from "react-redux";
import Main_image from "../../static/image/main_image.png";
import AuthModal from "../../components/menu/login/AuthModal";

const Main = () => {
  const loginModalOpen = useSelector((state) => state.commonSlice.openLogin);

  return (
    <div className={styles.main}>
      {loginModalOpen && <AuthModal />}
      <div className={styles.title}>
        <div className={styles.big_title}>
          <span>스터디</span>부터 <span>협업</span>까지
          <br /> 함께하는 즐거움
        </div>
        <div className={styles.sub_title}>
          계획적으로 진행하는 <span>공부</span>
          <br /> 함께 진행해야 하는 <span>스터디</span>
          <br /> <span>협업</span>까지 코코리와 함께 무료로 진행해보세요.
        </div>
        <button>코코리</button>
      </div>
      <div>
        <img src={Main_image} alt="main_image" />
      </div>
    </div>
  );
};

export default Main;
