import React, { useEffect } from "react";
import styles from "./style/_KanbanInvite.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Share from "../lib/share/Share";
import Logo from "../../static/image/cocoli_black.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getKanbanInviteCode } from "../../redux/Async/kanban";

const KanbanInvite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useLocation();
  const projectId = state.state;
  //
  useEffect(() => {
    dispatch(
      getKanbanInviteCode({
        projectId,
      })
    );
  }, [dispatch]);

  const inviteCode = useSelector((state) => state.kanbanSlice.inviteCode);

  const closeKanbanInviteClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.KanbanInvite}>
        {inviteCode}
        <img src={Logo} alt="share_logo" />
        <Share inviteCode={inviteCode} />
      </div>
      <div onClick={closeKanbanInviteClick} className={styles.overlay} />
    </>
  );
};

export default KanbanInvite;
