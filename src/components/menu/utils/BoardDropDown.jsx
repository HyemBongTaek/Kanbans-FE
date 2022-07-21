import React, { useContext } from "react";
import styles from "./style/_BoardDropDown.module.scss";
import ContextStore from "./ContextStore";

const BoardDropDown = ({ boardId, projectId }) => {
  const { deleteBoardClick, clearCards } = useContext(ContextStore);

  return (
    <>
      <div className={styles.dropdown}>
        <div onClick={() => deleteBoardClick({ boardId, projectId })}>
          게시판 삭제하기
        </div>
        <div onClick={() => clearCards({ boardId, projectId })}>
          게시판 카드 모두 삭제하기
        </div>
      </div>
    </>
  );
};

export default BoardDropDown;
