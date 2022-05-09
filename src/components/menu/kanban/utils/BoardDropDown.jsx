import React from "react";
import styles from "../../../../style/menu/utils/_BoardDropDown.module.scss";

const BoardDropDown = (props) => {
  return (
    <>
      <div className={styles.dropdown}>
        <div onClick={props.deleteBoard}>게시판 삭제하기</div>
        <div onClick={props.clearAllCards}>게시판 카드 모두 삭제하기</div>
      </div>
    </>
  );
};

export default BoardDropDown;
