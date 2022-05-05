import classNames from "classnames";
import React from "react";

import KanbanHeader from "../../components/menu/kanban/KanbanHeader";
import KanbanList from "../../components/menu/kanban/KanbanList";
import { useLocation } from "react-router-dom";
import styles from "../../style/_Main.module.scss";

const Kanban = ({ openNav }) => {
  return (
    <div className={openNav ? styles.main_big : styles.main_small}>
      <div className={classNames("main_layout")}>
        <KanbanHeader />

        <KanbanList />
      </div>
    </div>
  );
};

export default Kanban;
