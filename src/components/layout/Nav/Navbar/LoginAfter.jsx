import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../Style/_LoginAfter.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";

const LoginAfter = () => {
  const navigate = useNavigate();
  const navIndex = [0, 1, 2];
  const navMenu = ["profile", "project", "timer"];
  const navIcons = ["ph:users", "bi:calendar-check", "akar-icons:clock"];
  const navigation = ["/profile", "/project", "/timer"];

  const [isClose, setIsClose] = useState(false);
  const [isNav, setIsNav] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  //쿠키정의, 재정의, 쿠키제거를 한번에 넣어주지 않으면 제거가 되지 않아서 모두다 넣어줌.
  const [cookies, setCookie, removeCookie] = useCookies(["cocoriLogin"]);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    removeCookie("cocoriLogin", { path: "/" });
    window.location.replace("/");
  };

  return (
    <>
      {isClose ? (
        <div
          className={styles.small_navigation}
          onClick={() => setIsClose((pre) => !pre)}
        >
          <Icon className={styles.small_icon} icon="charm:plus" />
        </div>
      ) : (
        <div className={styles.navigation}>
          <ul>
            <li className={classNames(styles.list)}>
              <a>
                <span onClick={() => navigate("/")}>
                  <Icon className={styles.icons} icon="fa:home" />
                </span>
                <span className={styles.title}>Home</span>
              </a>
            </li>
            {navIndex.map((i, index) => {
              return (
                <li className={styles.list} key={index}>
                  <a>
                    <span
                      onClick={() => {
                        navigate(`${navigation[i]}`);
                      }}
                    >
                      <Icon className={styles.icons} icon={navIcons[i]} />
                    </span>
                    <span className={styles.title}>{navMenu[i]}</span>
                  </a>
                </li>
              );
            })}
            <li className={classNames(styles.list)}>
              <a>
                <span onClick={logoutHandler}>
                  <Icon className={styles.icons} icon="fe:logout" />
                </span>
                <span className={styles.title}>logout</span>
              </a>
            </li>
            <li className={classNames(styles.list)}>
              <a>
                <span onClick={() => setIsClose((pre) => !pre)}>
                  <Icon className={styles.icons} icon="line-md:minus" />
                </span>
                <span className={styles.title}>Close</span>
              </a>
            </li>

            {/*<div className={styles.indicator} />*/}
          </ul>
        </div>
      )}
    </>
  );
};

export default LoginAfter;
