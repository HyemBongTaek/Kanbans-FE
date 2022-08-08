import classNames from "classnames";
import React, { useState } from "react";
import styles from "./_KanbanBoards.module.scss";

import KanbanHeader from "../../components/Kanban/KanbanHeader";
import KanbanList from "../../components/Kanban/KanbanList";
import { useLocation, useParams } from "react-router-dom";
import MemberPage from "./MemberPage";
const KanbanBoards = () => {
  const params = useParams();
  const { state } = useLocation();

  const [isBoard, setIsBoard] = useState(true);
  const [isMember, setIsMember] = useState(false);

  return (
    <div className={styles.kanbanboard}>
      <KanbanHeader
        projectId={params.projectId}
        title={state}
        setIsBoard={setIsBoard}
        setIsMember={setIsMember}
      />
      {isBoard && <KanbanList />}
      {isMember && <MemberPage projectId={params.projectId} />}
    </div>
  );
};

export default KanbanBoards;
