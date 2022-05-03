import { Icon } from "@iconify/react";
import React from "react";

import styles from "./_Login.module.scss";
import { useDispatch } from "react-redux";

const LoginModal = ({ setIsOpen }) => {
  const dispatch = useDispatch;
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
            <div>구글</div>
            <div>네이버</div>
            <div>카카오</div>
          </div>
        </div>
      </div>
      <div
        className={styles.modal_overlay}
        aria-hidden="true"
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default LoginModal;
