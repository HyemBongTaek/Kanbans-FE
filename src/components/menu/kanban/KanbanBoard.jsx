import React from "react";

import styles from "./../../../style/menu/_KanbanBoard.module.scss";
import KanbanCard from "./KanbanCard";
import { Draggable, Droppable } from "react-beautiful-dnd";
import InputContainer from "./InputContainer";

const KanbanBoard = (props) => {
  console.log("칸반보드", props.column.id);
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
              {props.column.title}
              <span>3</span>
            </div>
            <Droppable droppableId={props.column.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {props?.boards?.map((task, index) => (
                    <KanbanCard key={task.id} tasks={task} index={index} />
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
