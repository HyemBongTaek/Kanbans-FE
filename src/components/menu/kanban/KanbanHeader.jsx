import React, { useState } from "react";

import styles from "../../../style/menu/_KanbanHeader.module.scss";
import SearchInput from "../../common/SearchInput";
import KanbanNav from "./KanbanNav";

const KanbanHeader = () => {
  return (
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
};

export default KanbanHeader;
