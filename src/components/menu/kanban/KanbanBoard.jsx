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

const KanbanBoard = (props) => {
  console.log("아이디를찾자", props);
  const dropdownRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  return (
    <>
      <Draggable
        draggableId={props.column.id.toString()}
        index={props.index}
        key={props.column.id}
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
                  boardTitle={props.column.title}
                  editable={editable}
                  setEditable={setEditable}
                  boardId={props.column.id}
                />
              </div>
            ) : (
              <div
                className={styles.kanban_title}
                {...provided.dragHandleProps}
              >
                <div onClick={() => setEditable(!editable)}>
                  {props.column.title}
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default KanbanBoard;
