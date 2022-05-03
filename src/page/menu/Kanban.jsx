import classNames from "classnames";
import React from "react";

import KanbanHeader from "../../components/menu/kanban/KanbanHeader";
import KanbanList from "../../components/menu/kanban/KanbanList";

const Kanban = () => (
  <div>
    <div className={classNames("main_layout")}>
      <KanbanHeader />

      <KanbanList />
    </div>
  </div>
);

export default Kanban;
