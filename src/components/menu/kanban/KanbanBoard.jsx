import React, { useContext, useRef, useState } from "react";
import styles from "./../../../style/menu/_KanbanBoard.module.scss";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { Icon } from "@iconify/react";
import InputContainer from "../utils/InputContainer";
import KanbanCard from "./KanbanCard";

import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import store from "../../contextStore";
import uuid from "react-uuid";
import EditableInput from "../utils/EditableInput";
import BoardDropDown from "../utils/BoardDropDown";

const KanbanBoard = (props) => {
  const dropdownRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const boards = props.column;
  const dropdownClick = () => setIsActive(!isActive);
  return (
    <>
      <Draggable
        draggableId={boards.id.toString()}
        index={props.index}
        key={boards.id}
      >
        {(provided) => (
          <div
            className={styles.kanban_board}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {editable ? (
              <div>
                <EditableInput
                  items={props}
                  boardTitle={boards.title}
                  editable={editable}
                  setEditable={setEditable}
                  boardId={boards.id}
                />
              </div>
            ) : (
              <div {...provided.dragHandleProps}>
                <div className={styles.kanban_title}>
                  <div onClick={() => setEditable(!editable)}>
                    {props.column.title}
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
                        boardId={props.column.id}
                      />
                    )}
                  </div>
                </div>
                <div>
                  {boards &&
                    boards.cardId?.map((task, index) => (
                      <KanbanCard
                        tasks={task}
                        index={index}
                        boardId={props.id}
                      />
                    ))}
                </div>
                <InputContainer type="card" boardId={props.column.id} />
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default KanbanBoard;
