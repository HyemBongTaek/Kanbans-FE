import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../Style/_LoginAfter.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginAfter = () => {
  const navigate = useNavigate();
  const navIndex = [0, 1, 2];
  const navMenu = ["profile", "project", "timer"];
  const navIcons = ["ph:users", "bi:calendar-check", "fa:home"];
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

  return (
    <>
      {isClose ? (
        <div onClick={() => setIsClose((pre) => !pre)}>헹구</div>
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
                <span onClick={() => setIsClose((pre) => !pre)}>
                  <Icon className={styles.icons} icon="fa:home" />
                </span>
                <span className={styles.title}>Home</span>
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
