import React, { useContext, useRef, useState } from "react";
import styles from "./../../../style/menu/_KanbanBoard.module.scss";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { Icon } from "@iconify/react";
import BoardDropDown from "./utils/BoardDropDown";
import InputContainer from "./utils/InputContainer";
import KanbanCard from "./KanbanCard";

import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import store from "../../contextStore";

const KanbanBoard = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const dropdownClick = () => setIsActive(!isActive);

  const { clearAllCardsHandler, deleteBoardHandler } = useContext(store);

  const boardId = props.column.id;
  //카드모두지우기
  const clearAllCards = () => {
    clearAllCardsHandler(boardId);
  };
  //보드 삭제하기
  const deleteBoard = () => {
    deleteBoardHandler(boardId);
  };

  return (
    <>
      <Draggable draggableId={props.column.id} index={props.index}>
        {(provided) => (
          <div
            className={styles.kanban_board}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className={styles.kanban_title} {...provided.dragHandleProps}>
              <div>
                {/*<input value={props.column.title}/>*/}
                {props.column.title}
                <span className={styles.kanban_count}>
                  {props.column.taskIds.length}
                </span>
              </div>
              <div ref={dropdownRef}>
                <Icon
                  icon="bi:three-dots"
                  color="#8c8c8c"
                  height="30"
                  onClick={dropdownClick}
                />
                {isActive && (
                  <BoardDropDown
                    dropdownClick={dropdownClick}
                    clearAllCards={clearAllCards}
                    deleteBoard={deleteBoard}
                  />
                )}
              </div>
            </div>
            <Droppable droppableId={props.column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {props?.boards?.map((task, index) => (
                    <KanbanCard
                      key={task.id}
                      tasks={task}
                      index={index}
                      boardId={props.column.id}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <InputContainer type="card" boardId={props.column.id} />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default KanbanBoard;
