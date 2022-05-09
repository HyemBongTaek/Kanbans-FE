import React from "react";

import styles from "./../style/_Main.module.scss";
import KanbanBoards from "./menu/kanban/KanbanBoards";

const Main = ({ openNav }) => {
  return <div className={openNav ? styles.main_big : styles.main_small}></div>;
};

export default Main;
