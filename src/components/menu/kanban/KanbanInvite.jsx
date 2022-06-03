import React, { useEffect } from "react";
import styles from "./style/_KanbanInvite.module.scss";
import { useDispatch } from "react-redux";
import Share from "../../lib/share/Share";
import Logo from "../../../static/image/cocoli_black.png";
const KanbanInvite = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.KanbanInvite}>
        <img src={Logo} alt="share_logo" />
        <Share />
      </div>
      <div className={styles.overlay} />
    </>
  );
};

export default KanbanInvite;
