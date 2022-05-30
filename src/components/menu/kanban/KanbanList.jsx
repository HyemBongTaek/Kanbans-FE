import React, { createContext, useEffect, useState } from "react";
import styles from "../../../style/menu/_KanbanBoard.module.scss";

import KanbanData from "./KanbanData";

import ContextStore from "../../contextStore";

import KanbanBoard from "./KanbanBoard";
import InputContainer from "../utils/InputContainer";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBoardTitle,
  getKanbanBoard,
  sortKanban,
} from "../../../redux/Async/kanbanboard";
import KanbanFeatures from "./KanbanFeatures";

const KanbanList = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.kanbanSlice.kanbans);

  console.log("보드", boards);

  //보드 불러오기
  useEffect(() => {
    dispatch(
      getKanbanBoard({
        projectId: params.projectId,
      })
    );
  }, [dispatch, getKanbanBoard]);

  //칸반보드 이동(카드이동, 보드이동)
  const onDragEnd = (result) => {
    //보드이동
    const { destination, source, draggableId, type } = result;
    console.log("destination", destination);
    console.log("source", source);
    console.log("draggableId", draggableId);
    console.log("type", type);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (type === "column") {
      const newBoardOrder = [...boards.columnOrders];
      console.log("===========진짜확인용", newBoardOrder);
      newBoardOrder.splice(source.index, 1);
      newBoardOrder.splice(destination.index, 0, draggableId);
      dispatch(
        sortKanban({
          columnOrder: boards.columnOrders,
          newBoardOrder,
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
          draggableId,
          type,
          projectId: params.projectId,
          boards,
        })
      );
    }
  };

  return (
    <>
      <KanbanFeatures boards={boards}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="kanbanProject"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={styles.kanban_list}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {boards &&
                  boards.columnOrders?.map((boardId, index) => {
                    const column = boards.board[boardId];
                    // const cards = column.card_id?.map((cardId) => boards.card_id[cardId]);
                    return (
                      <KanbanBoard
                        key={column.id}
                        column={column}
                        // cards={cards}
                        index={index}
                      />
                    );
                  })}
                {provided.placeholder}
                <InputContainer
                  type="board"
                  projectId={params.projectId}
                  boards={boards}
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/*</ContextStore.Provider>*/}
      </KanbanFeatures>
    </>
  );
};

export default KanbanList;
