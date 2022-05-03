import React from "react";

import styles from "./../style/_Main.module.scss";
import Kanban from "./menu/Kanban";

const Main = ({ openNav }) => (
  <div className={openNav ? styles.main_big : styles.main_small}>
    <Kanban />
  </div>
);

export default Main;
