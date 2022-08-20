import React, { useState } from "react";
import styles from "./style/_JoinProjectModal.module.scss";
import { useDispatch } from "react-redux";
import { joinProject } from "../../redux/Async/projects";
import Logo from "../../static/image/cocori02.png";

const JoinProjectModal = ({ setIsJoin }) => {
  const dispatch = useDispatch();
  const [isCode, setIsCode] = useState("");

  const leaveModal = () => {
    setIsJoin(false);
  };

  const joinProjects = () => {
    dispatch(
      joinProject({
        inviteCode: isCode,
      })
    );
    setIsJoin(false);
  };
  return (
    <>
      <div className={styles.join_modal}>
        <div className={styles.project_join}>
          <img src={Logo} alt="cocori_logo" />
          <div className={styles.join_title}>
            프로젝트 코드를 입력하여
            <br />
            진행중인 프로젝트에 지금 참가해 보세요.{" "}
          </div>
          <form onSubmit={joinProjects}>
            <label>
              <input onChange={(e) => setIsCode(e.target.value)} />
            </label>
          </form>
          <button onClick={joinProjects}>참가하기</button>
        </div>
      </div>
      <div className={styles.modal_overlay} onClick={leaveModal} />
    </>
  );
};

export default JoinProjectModal;
