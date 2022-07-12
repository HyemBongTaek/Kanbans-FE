import React, { useEffect } from "react";
import styles from "./_Invite.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Share from "../Invite/Share";
import Logo from "../../static/image/cocoli_black.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getKanbanInviteCode } from "../../redux/Async/kanban";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
        {/*<img src={Logo} alt="share_logo" />*/}
        <div>공유하기</div>
        {inviteCode}
        <CopyToClipboard text={inviteCode}>
          <button>초대코드 복사하기</button>
        </CopyToClipboard>
        <Share inviteCode={inviteCode} />
      </div>
      <div onClick={closeKanbanInviteClick} className={styles.overlay} />
    </>
  );
};

export default Invite;
