import React, { useState } from "react";
import styles from "./style/_JoinProjectModal.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinProject } from "../../redux/Async/projects";
import Logo1 from "../../static/image/cocori01.png";
import Logo2 from "../../static/image/cocori02.png";
import Logo3 from "../../static/image/cocori03.png";
import Logo4 from "../../static/image/cocori04.png";
import Logo5 from "../../static/image/cocori05.png";

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
    navigate(-1);
  };
  return (
    <>
      <div className={styles.join_modal}>
        <div className={styles.project_join}>
          <img src={Logo3} alt="cocori_logo" />
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
