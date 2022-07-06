import classNames from "classnames";
import React from "react";

import KanbanHeader from "../../../components/menu/kanban/KanbanHeader";
import KanbanList from "../../../components/menu/kanban/KanbanList";
import { useLocation, useParams } from "react-router-dom";
const KanbanBoards = () => {
  const params = useParams();
  const { state } = useLocation();
  console.log("uss", params, state);
  return (
    <div>
      <div className={classNames("main_layout")}>
        <KanbanHeader projectId={params.projectId} title={state} />
        <KanbanList />
      </div>
    </div>
  );
};

export default KanbanBoards;
