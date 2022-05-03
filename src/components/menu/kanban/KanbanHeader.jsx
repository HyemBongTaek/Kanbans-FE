import React from "react";

import styles from "../../../style/menu/_KanbanBoard.module.scss";
import SearchInput from "../../common/SearchInput.tsx.jsx";

const KanbanHeader = () => (
  <div className={styles.kanban_header}>
    <div>Kanban Board</div>
    <SearchInput />
  </div>
);

export default KanbanHeader;
