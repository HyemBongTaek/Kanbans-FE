import React, { useContext, useRef, useState } from "react";
import styles from "./../../../style/menu/_KanbanBoard.module.scss";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { Icon } from "@iconify/react";
import BoardDropDown from "./utils/BoardDropDown";
import InputContainer from "./InputContainer";
import KanbanCard from "./KanbanCard";

import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import store from "./store";

const KanbanBoard = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const dropdownClick = () => setIsActive(!isActive);

  const { clearAllCardsHandler } = useContext(store);
  //카드모두지우기
  const clearAllCards = () => {
    const boardId = props.column.id;
    clearAllCardsHandler(boardId);
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
                {props.column.title}
                <span>3</span>
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
