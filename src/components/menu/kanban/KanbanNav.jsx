import React from "react";
import styles from "../../../style/menu/_KanbanHeader.module.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const KanbanNav = ({ projectId }) => {
  const navigate = useNavigate();

  const inviteClick = () => {
    navigate("/test", { state: projectId });
  };
  return (
    <div className={styles.kanban_nav}>
      <div>Boards</div>
      <div>Member</div>
      <div onClick={inviteClick}>invite</div>
      <div>헹구</div>
    </div>
  );
};

export default KanbanNav;
