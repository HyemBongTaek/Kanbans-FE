import React, { createContext, useEffect, useRef, useState } from "react";
import styles from "./style/_KanbanBoard.module.scss";

import KanbanBoard from "./KanbanBoard";
import InputContainer from "../utils/InputContainer";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getKanbanBoard,
  moveSortKanbanCard,
  sortKanbanBoard,
  sortKanbanCard,
} from "../../../redux/Async/kanban";
import KanbanFeatures from "../utils/KanbanFeatures";
import { sortKanbanCardReducer } from "../../../redux/Slice/kanbanSlice";

const KanbanList = () => {
  //주소에서 projectId불러오기
  const params = useParams();
  const projectId = params.projectId;
  const dispatch = useDispatch();

  //보드 내용 불러오기

  const boards = useSelector((state) => state.kanbanSlice.kanbans);
  console.log("보드내용", boards);

  const { board, card, columnOrders } = useSelector((state) => ({
    board: state.kanbanSlice.kanbans.board,
    card: state.kanbanSlice.kanbans.cards,
    columnOrders: state.kanbanSlice.kanbans.columnOrders,
  }));

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
        sortKanbanBoard({
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
      const newCardIds = Array.from(start.cardId);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newBoard = {
        ...start,
        cardId: newCardIds,
      };

      //카드 번쩍거리는 이미지를 위해 서버로 전달하는 리덕스와 기존 배열을 변경하는 리덕스를 양쪽으로 나눠서 사용함.
      dispatch(
        sortKanbanCardReducer({
          newBoard,
        })
      );

      dispatch(
        sortKanbanCard({
          boardId: source.droppableId,
          newBoard,
          startCards: start,
        })
      );
    } else {
      //카드를 드래그해서 다른 보드로 이동할 경우.
      const startCardId = Array.from(start.cardId);
      startCardId.splice(source.index, 1);
      const newStart = {
        ...start,
        cardId: startCardId,
      };
      const finishCardId = Array.from(finish.cardId);
      finishCardId.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        cardId: finishCardId,
      };
      dispatch(
        moveSortKanbanCard({
          startBoardId: source.droppableId,
          startCardIds: start.cardId,
          finishBoardId: destination.droppableId,
          finishCardIds: finishCardId,
          newFinish: newFinish,
          newStartId: newStart.id,
          newStart: newStart,
          newFinishId: newFinish.id,
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
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.kanban_list}
              >
                {columnOrders &&
                  columnOrders?.map((boardId, index) => {
                    const boards = board[boardId];
                    const cards = boards?.cardId?.map((cardId) => card[cardId]);
                    console.log("보드아이디", boardId);
                    return (
                      <KanbanBoard
                        key={boards.id}
                        boardsNewId={`board_${boards.id}`}
                        boards={boards}
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
