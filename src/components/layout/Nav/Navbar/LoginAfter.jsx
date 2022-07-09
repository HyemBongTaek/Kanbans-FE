import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../Style/_LoginAfter.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const LoginAfter = () => {
  const navigate = useNavigate();
  const navIndex = [0, 1, 2, 3];
  const navMenu = ["profile", "project", "timer", "questions"];
  const navIcons = [
    "ph:users",
    "bi:calendar-check",
    "fa:home",
    "akar-icons:circle-minus-fill",
  ];
  const navigation = ["/", "/profile", "/project", "/timer"];

  const [isClose, setIsClose] = useState(false);
  const [isNav, setIsNav] = useState(false);
  return (
    <>
      {isClose ? (
        <div>헹구</div>
      ) : (
        <div className={styles.navigation}>
          <ul>
            <li className={classNames(styles.list, styles.active)}>
              <a>
                <span>
                  <Icon className={styles.icons} icon="fa:home" />
                </span>
                <span className={styles.title}>Home</span>
              </a>
            </li>
            {navIndex.map((i) => {
              return (
                <>
                  <li className={styles.list}>
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
                </>
              );
            })}

            <div className={styles.indicator} />
          </ul>
        </div>
      )}
    </>
  );
};

export default LoginAfter;
