import React, { useState } from "react";
import styles from "./style/_JoinProjectModal.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinProject } from "../../../redux/Async/projects";

const JoinProjectModal = () => {
  const dispatch = useDispatch();
  const [isCode, setIsCode] = useState("");
  const navigate = useNavigate();

  const leaveModal = () => {
    navigate(-1);
  };

  const joinProjects = () => {
    dispatch(
      joinProject({
        inviteCode: isCode,
      })
    );
  };
  return (
    <>
      <div className={styles.join_modal}>
        <div>zzz</div>
        <form onSubmit={joinProjects}>
          <label>
            <input onChange={(e) => setIsCode(e.target.value)} />
          </label>
        </form>
        <button onClick={joinProjects}>참가하기</button>
      </div>
      <div className={styles.modal_overlay} onClick={leaveModal} />
    </>
  );
};

export default JoinProjectModal;
