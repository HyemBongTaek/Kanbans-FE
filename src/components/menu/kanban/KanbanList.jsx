import React, { createContext, useEffect, useRef, useState } from "react";
import styles from "../../../style/menu/_KanbanBoard.module.scss";

import KanbanBoard from "./KanbanBoard";
import InputContainer from "../utils/InputContainer";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKanbanBoard, sortKanban } from "../../../redux/Async/kanbanboard";
import KanbanFeatures from "./KanbanFeatures";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

const KanbanList = () => {
  //주소에서 projectId불러오기
  const params = useParams();
  const projectId = params.projectId;
  const dispatch = useDispatch();

  //보드 내용 불러오기

  const boards = useSelector((state) => state.kanbanSlice.kanbans);
  console.log("=====보드내용", boards);

  //보드 불러오기
  useEffect(() => {
    dispatch(
      getKanbanBoard({
        projectId,
      })
    );
  }, [dispatch, getKanbanBoard]);

  //칸반보드 이동(카드이동, 보드이동)
  const onDragEnd = (result) => {
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
          projectId,
          boards,
        })
      );
    }
    const start = boards.board[source.droppableId];
    const finish = boards.board[destination.droppableId];

    //카드가 다른보드로 이동하지 않을 경우
    if (start === finish) {
      const newCardIds = Array.from(start.cards);
      console.log("카드", newCardIds);
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
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.kanban_list}
              >
                {boards &&
                  boards.columnOrders?.map((boardId, index) => {
                    const column = boards.board[boardId];
                    const cards = column?.cardId?.map(
                      (cardId) => boards.cards[cardId]
                    );

                    console.log("======카드확인", cards);
                    return (
                      <KanbanBoard
                        key={column.id}
                        column={column}
                        cards={cards}
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
      </KanbanFeatures>
    </>
  );
};

export default KanbanList;
