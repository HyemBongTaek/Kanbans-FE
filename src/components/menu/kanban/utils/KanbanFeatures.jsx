import React, { useState } from "react";
import {
  changeBoardTitle,
  clearAllKanbanCards,
  deleteBoard,
} from "../../../../redux/Async/kanban";
import { useDispatch, useSelector } from "react-redux";

import ContextStore from "../../../contextStore";

//kanban에서 사용할 context
const KanbanFeatures = (props) => {
  const { boards } = props;
  const dispatch = useDispatch();

  //보드타이틀변경
  const changeTitle = ({ title, boardId, editable, setEditable }) => {
    dispatch(
      changeBoardTitle({
        boardId,
        title,
      })
    );
    setEditable(false);
  };

  //보드 삭제
  const deleteBoardClick = ({ boardId }) => {
    dispatch(
      deleteBoard({
        boards: boards,
        boardId,
      })
    );
  };

  //카드 모두 삭제
  const clearCards = ({ boardId }) => {
    dispatch(clearAllKanbanCards({ boardId }));
  };

  return (
    <>
      <ContextStore.Provider
        value={{ changeTitle, deleteBoardClick, clearCards }}
      >
        {props.children}
      </ContextStore.Provider>
    </>
  );
};

export default KanbanFeatures;
