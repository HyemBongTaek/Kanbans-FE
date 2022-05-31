import React from "react";
import {
  changeBoardTitle,
  deleteBoard,
  sortKanban,
} from "../../../redux/Async/kanban";
import { useDispatch, useSelector } from "react-redux";

import ContextStore from "../../contextStore";

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

  //카드등록
  const addCardHandler = ({ boardId }) => {
    console.log("카드등록", boardId);
    dispatch();
  };

  return (
    <>
      <ContextStore.Provider value={{ changeTitle, deleteBoardClick }}>
        {props.children}
      </ContextStore.Provider>
    </>
  );
};

export default KanbanFeatures;
