import React, { useState } from "react";
import styles from "./style/_JoinProjectModal.module.scss";
import { useNavigate } from "react-router-dom";

const JoinProjectModal = () => {
  const [isCode, setIsCode] = useState("");
  const navigate = useNavigate();

  const leaveModal = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.join_modal}>
        <div>zzz</div>
        <form>
          <label>
            <input />
          </label>
        </form>
        <button>참가하기</button>
      </div>
      <div className={styles.modal_overlay} onClick={leaveModal} />
    </>
  );
};

export default JoinProjectModal;
