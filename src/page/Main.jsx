import React, { useEffect } from "react";

import styles from "./../style/_Main.module.scss";
import { useSelector } from "react-redux";

const Main = ({ openNav }) => {
  return (
    <div className={openNav ? styles.main_big : styles.main_small}>헹구</div>
  );
};

export default Main;
