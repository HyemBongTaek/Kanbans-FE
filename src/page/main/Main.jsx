import React from "react";

import styles from "./_Main.module.scss";
import { useSelector } from "react-redux";
import BigLogo from "../../static/image/big_logo.png";
import AuthModal from "../../components/menu/login/AuthModal";

const Main = () => {
  const loginModalOpen = useSelector((state) => state.commonSlice.openLogin);

  return (
    <div className={styles.main}>
      {loginModalOpen && <AuthModal />}
      <div>
        <span>여기는 설명칸이다 왜냐하면 설명을 해야하기 때문이다</span>
      </div>
      <div>
        <img src={BigLogo} alt="big_logo" />
      </div>
    </div>
  );
};

export default Main;
