import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./style/_KanbanBoard.module.scss";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { Icon } from "@iconify/react";
import InputContainer from "../utils/InputContainer";
import KanbanCard from "./KanbanCard";

import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import EditableInput from "../utils/EditableInput";
import BoardDropDown from "../utils/BoardDropDown";

const KanbanBoard = (props) => {
  const dropdownRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const boards = props.boards;

  const dropdownClick = () => setIsActive((pre) => !pre);

  //아래로 스크롤 내려가고 채팅 올라올 시 자동으로 스크롤 아래로 내려주기.
  const endRef = useRef(null);

  const scrollToBottom = () => {
    if (endRef && endRef.current) {
      endRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(scrollToBottom, [props]);
  return (
    <>
      <Draggable
        key={boards.id}
        draggableId={boards.id.toString()}
        index={props.index}
      >
        {(provided) => (
          <div
            className={styles.kanban_board}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <>
              <div
                className={styles.kanban_title}
                {...provided.dragHandleProps}
              >
                {editable ? (
                  <EditableInput
                    items={props}
                    boardTitle={boards.title}
                    editable={editable}
                    setEditable={setEditable}
                    boardId={boards.id}
                    projectId={boards.projectId}
                  />
                ) : (
                  <div onClick={() => setEditable(!editable)}>
                    {props.boards.title}
                  </div>
                )}

                <div className={styles.dropdown} ref={dropdownRef}>
                  <Icon
                    icon="bi:three-dots"
                    color="#8c8c8c"
                    height="30"
                    onClick={dropdownClick}
                  />
                  {isActive && (
                    <BoardDropDown
                      dropdownClick={dropdownClick}
                      boardId={props.boards.id}
                      cardOrder={props.boards.cardId}
                      projectId={boards.projectId}
                    />
                  )}
                </div>
              </div>

              <Droppable droppableId={boards.id.toString()} type="card">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {boards &&
                      props?.cards?.map((cards, index) => {
                        return (
                          <KanbanCard
                            key={cards.id}
                            cards={cards}
                            index={index}
                            boardId={boards.id}
                            projectId={boards.projectId}
                          />
                        );
                      })}

                    {provided.placeholder}
                    <InputContainer
                      type="card"
                      boardId={props.boards.id}
                      projectId={boards.projectId}
                    />
                  </div>
                )}
              </Droppable>
            </>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default React.memo(KanbanBoard);
