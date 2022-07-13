import React, { useRef } from "react";
import { useDimensions } from "../../../../hooks/useDemenstions";
import { useCookies } from "react-cookie";
import { motion, useCycle } from "framer-motion";
import Navigation from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import { Icon } from "@iconify/react";
import styles from "../Style/_AfterLogin.module.scss";

const AfterLogin = ({ isOpen, toggleOpen }) => {
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  //쿠키정의, 재정의, 쿠키제거를 한번에 넣어주지 않으면 제거가 되지 않아서 모두다 넣어줌.
  const [cookies, setCookie, removeCookie] = useCookies(["cocoriLogin"]);
  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    removeCookie("cocoriLogin", { path: "/" });
    window.location.replace("/");
  };
  // const navHandler = () => {
  //   setIsOpen(!isOpen);
  // };
  return (
    <>
      <div className={styles.after_login}>
        <motion.nav
          className={styles.nav}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
        >
          <motion.div className={styles.background} variants={sideNav} />
          <Navigation toggleOpen={toggleOpen} isOpen={isOpen} />
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
        <button className={styles.button} onClick={logoutHandler}>
          <Icon className={styles.icon} icon="clarity:logout-line" />
          Logout
        </button>
      </div>
    </>
  );
};

const sideNav = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: -1,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default AfterLogin;
