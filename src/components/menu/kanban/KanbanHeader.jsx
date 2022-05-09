import React from "react";

import styles from "../../../style/menu/_KanbanHeader.module.scss";
import SearchInput from "../../common/SearchInput.tsx.jsx";
import KanbanNav from "./KanbanNav";

const KanbanHeader = () => (
  <>
    <div className={styles.kanban_header}>
      <div>Kanban Board</div>
      <SearchInput />
    </div>
    <div>
      <KanbanNav />
    </div>
  </>
);

export default KanbanHeader;
