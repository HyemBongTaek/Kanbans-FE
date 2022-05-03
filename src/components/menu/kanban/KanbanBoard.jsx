import React from "react";

import styles from "./../../../style/menu/_KanbanBoard.module.scss";
import KanbanCard from "./KanbanCard";

const KanbanBoard = () => (
  <div>
    <div className={styles.kanban_board}>
      <div>Title</div>
      <div className={styles.kanban_cards}>
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
        <KanbanCard />
      </div>
    </div>
  </div>
);

export default KanbanBoard;
