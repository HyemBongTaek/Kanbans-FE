import React, { useEffect } from "react";
import styles from "./_Invite.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Share from "./Share";
import Logo from "../../../static/image/cocori02.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getKanbanInviteCode } from "../../../redux/Async/kanban";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Icon } from "@iconify/react";

const Invite = () => {
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
        <div className={styles.logo}>
          <img src={Logo} alt="cocori_logo" />
        </div>
        <div className={styles.invite_code}>
          {inviteCode}
          <CopyToClipboard text={inviteCode}>
            <Icon
              className={styles.copy}
              icon="akar-icons:copy"
              color="#8c8c8c"
              height="30"
            />
          </CopyToClipboard>
        </div>
        <div className={styles.share_icons}>
          <Share inviteCode={inviteCode} />
        </div>
      </div>
      <div onClick={closeKanbanInviteClick} className={styles.overlay} />
    </>
  );
};

export default Invite;
