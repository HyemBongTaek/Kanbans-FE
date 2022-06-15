import React, { useContext } from "react";
import styles from "./style/_BoardDropDown.module.scss";
import ContextStore from "./ContextStore";

const BoardDropDown = ({ boardId }) => {
  const { deleteBoardClick, clearCards } = useContext(ContextStore);

  return (
    <>
      <div className={styles.dropdown}>
        <div onClick={() => deleteBoardClick({ boardId })}>게시판 삭제하기</div>
        <div onClick={() => clearCards({ boardId })}>
          게시판 카드 모두 삭제하기
        </div>
      </div>
    </>
  );
};

export default BoardDropDown;
