import React from "react";
import styles from "../../../style/menu/_KanbanHeader.module.scss";
const KanbanNav = () => {
  return (
    <div className={styles.kanban_nav}>
      <div>Boards</div>
      <div>Member</div>
      <div>invite</div>
      <div>헹구</div>
    </div>
  );
};

export default KanbanNav;
