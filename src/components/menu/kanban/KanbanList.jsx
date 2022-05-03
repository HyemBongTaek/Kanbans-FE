import React from "react";
import { useSelector } from "react-redux";

import styles from "../../../style/menu/_KanbanBoard.module.scss";
import KanbanBoard from "./KanbanBoard";

const KanbanList = () => {
  return (
    <div className={styles.kanban_list}>
      <KanbanBoard />
      <KanbanBoard />
      <KanbanBoard />
      <KanbanBoard />
      <KanbanBoard />
      <KanbanBoard />
    </div>
  );
};

export default KanbanList;
