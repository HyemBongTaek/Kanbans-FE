import classNames from "classnames";
import React from "react";

import KanbanHeader from "../../../components/menu/kanban/KanbanHeader";
import KanbanList from "../../../components/menu/kanban/KanbanList";
import { useParams } from "react-router-dom";
const KanbanBoards = () => {
  const params = useParams();
  console.log("uss", params);
  return (
    <div>
      <div className={classNames("main_layout")}>
        <KanbanHeader projectId={params.projectId} />
        <KanbanList />
      </div>
    </div>
  );
};

export default KanbanBoards;
