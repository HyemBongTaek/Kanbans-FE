import classNames from "classnames";
import React from "react";

import KanbanHeader from "../../../components/menu/kanban/KanbanHeader";
import KanbanList from "../../../components/menu/kanban/KanbanList";
import styles from "../../../style/_Main.module.scss";

const KanbanBoards = ({ openNav }) => {
  return (
    <div className={openNav ? styles.main_big : styles.main_small}>
      <div className={classNames("main_layout")}>
        <KanbanHeader />

        <KanbanList />
      </div>
    </div>
  );
};

export default KanbanBoards;
