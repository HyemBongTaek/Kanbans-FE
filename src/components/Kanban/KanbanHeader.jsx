import React, { useState } from "react";

import styles from "../../style/menu/_KanbanHeader.module.scss";
import SearchInput from "../common/SearchInput";
import { useNavigate } from "react-router-dom";

const KanbanHeader = ({ projectId, title, setIsBoard, setIsMember }) => {
  const navigate = useNavigate();
  const inviteClick = () => {
    navigate("/test", { state: projectId });
  };
  const BoardClickHandler = () => {
    setIsBoard(true);
    setIsMember(false);
  };
  const MemberClickHandler = () => {
    setIsMember(true);
    setIsBoard(false);
  };

  return (
    <>
      <div className={styles.kanban_header}>
        <div>{title}</div>
        <SearchInput />
      </div>
      <div>
        <div className={styles.kanban_nav}>
          <div onClick={BoardClickHandler}>Boards</div>
          <div onClick={MemberClickHandler}>Member</div>
          <div onClick={inviteClick}>invite</div>
          <div>헹구</div>
        </div>
      </div>
    </>
  );
};

export default KanbanHeader;
