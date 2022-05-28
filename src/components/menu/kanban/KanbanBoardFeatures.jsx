import React from "react";
import { changeBoardTitle } from "../../../redux/Async/kanbanboard";
import { useDispatch, useSelector } from "react-redux";

import ContextStore from "../../contextStore";

const KanbanBoardFeatures = (props) => {
  console.log("확인용", props);
  const dispatch = useDispatch();

  //보드타이틀변경
  const changeTitle = ({ title, boardId, editable, setEditable }) => {
    dispatch(
      changeBoardTitle({
        boardId,
        title,
        boards: props.boards,
      })
    );
    setEditable(false);
  };

  const deleteBoard = () => {};

  return (
    <>
      <ContextStore.Provider value={{ changeTitle }}>
        {props.children}
      </ContextStore.Provider>
    </>
  );
};

export default KanbanBoardFeatures;
