import React, { useContext } from "react";
import styles from "./style/_BoardDropDown.module.scss";
import ContextStore from "../../contextStore";

const BoardDropDown = ({ boardId }) => {
  // onClick={props.deleteBoard}
  // onClick={props.clearAllCards}

  const { deleteBoardClick } = useContext(ContextStore);

  return (
    <>
      <div className={styles.dropdown}>
        <div onClick={() => deleteBoardClick({ boardId })}>게시판 삭제하기</div>
        <div>게시판 카드 모두 삭제하기</div>
      </div>
    </>
  );
};

export default BoardDropDown;
