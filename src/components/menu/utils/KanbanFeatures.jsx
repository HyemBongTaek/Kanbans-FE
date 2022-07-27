import React, { useEffect, useState } from "react";
import {
  changeBoardTitle,
  cardAllDelete,
  deleteBoard,
} from "../../../redux/Async/kanban";
import ContextStore from "./ContextStore";
import { useDispatch, useSelector } from "react-redux";
import {
  boardAddSocket,
  boardDeleteSocket,
  cardAllDeleteSocket,
  changeBoardTitleSocket,
} from "../../../redux/Slice/socketSlice";
import { socket } from "../../../redux/store";

//kanban에서 사용할 context
const KanbanFeatures = (props) => {
  const { boards } = props;
  const dispatch = useDispatch();

  //보드타이틀변경
  const changeTitle = ({
    title,
    boardId,
    editable,
    setEditable,
    projectId,
  }) => {
    dispatch(
      changeBoardTitle({
        boardId,
        title,
      })
    );
    dispatch(
      changeBoardTitleSocket({
        room: projectId,
        boardId,
        title,
      })
    );
    setEditable(false);
  };

  //보드 삭제
  const deleteBoardClick = ({ boardId, projectId, cardOrder }) => {
    // socket.emit("join", projectId);
    dispatch(
      deleteBoard({
        boards: boards,
        boardId,
        cardOrder,
      })
    );
    dispatch(
      boardDeleteSocket({
        room: projectId,
        boardId,
      })
    );
  };

  //카드 모두 삭제
  const clearCards = ({ boardId, projectId, cardOrder }) => {
    dispatch(cardAllDelete({ boardId, cardOrder }));
    dispatch(cardAllDeleteSocket({ boardId, room: projectId }));
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
