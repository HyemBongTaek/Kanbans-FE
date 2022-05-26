import React, { useContext, useRef, useState } from "react";
import styles from "./../../../style/menu/_KanbanBoard.module.scss";

import { Draggable, Droppable } from "react-beautiful-dnd";

import { Icon } from "@iconify/react";
import BoardDropDown from "./utils/BoardDropDown";
import InputContainer from "./utils/InputContainer";
import KanbanCard from "./KanbanCard";

import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import store from "../../contextStore";
import uuid from "react-uuid";

const KanbanBoard = (props) => {
  const [editable, setEditable] = useState(false);
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
            <div className={styles.kanban_title} {...provided.dragHandleProps}>
              <div>{props.column.title}</div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default KanbanBoard;
