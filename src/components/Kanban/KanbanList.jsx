import React, { useEffect, useState } from "react";
import styles from "./style/_KanbanList.module.scss";
import { history } from "../../history";

import KanbanBoard from "./KanbanBoard";
import InputContainer from "./InputContainer";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBoardTitle,
  getKanbanBoard,
  moveSortKanbanCard,
  sortKanbanBoard,
  sortKanbanCard,
} from "../../redux/Async/kanban";
import KanbanFeatures from "../menu/utils/KanbanFeatures";
import {
  cardAllDeleteReducer,
  cardCheckReducer,
  cardStatusChangeReducer,
  createBoardReducer,
  createCardReducer,
  deleteBoardReducer,
  deleteCardReducer,
  moveKanbanBoardReducer,
  sortKanbanCardMoveReducer,
  sortKanbanCardReducer,
} from "../../redux/Slice/kanbanSlice";
import { socket } from "../../redux/store";
import { startDragSocket, endDragSocket } from "../../redux/Slice/socketSlice";

const KanbanList = () => {
  //주소에서 projectId불러오기
  const params = useParams();
  const projectId = params.projectId;
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
    socket.emit("join", projectId);
  }, []);

  //페이지를 떠나거나 뒤로갈 경우 소켓 자동으로 해제되게 만들었음.
  useEffect(() => {
    return history.listen(() => {
      socket.emit("leave", projectId);
      socket.disconnect();
    });
  }, [history]);

  const [selectEl, setSelectEl] = useState("");
  const [isDrag, setIsDrag] = useState(true);

  useEffect(() => {
    socket.emit("join", projectId);
  }, [params]);

  useEffect(() => {
    socket?.on("connect", () => {});

    socket?.on("connect_error", (err) => {
      console.log(err);
    });

    socket?.on("isDrag", (payload) => {
      setIsDrag(payload);
    });

    socket?.on("duplicatedDrag", ({ message }) => {});
    socket.on("moveResult", (payload) => {
      if (payload.type === "card" && payload.startOrder !== null) {
        dispatch(
          sortKanbanCardMoveReducer({
            startPoint: payload.startPoint,
            endPoint: payload.endPoint,
            startOrder: payload.startOrder,
            endOrder: payload.endOrder,
          })
        );
      }
      if (payload.type === "card" && payload.startOrder === null) {
        dispatch(
          sortKanbanCardReducer({
            endPoint: payload.endPoint,
            endOrder: payload.endOrder,
          })
        );
      }
      if (payload.type === "column") {
        dispatch(
          moveKanbanBoardReducer({
            order: payload.order,
          })
        );
      }
    });
    socket?.on("cardStatusResult", (payload) => {
      dispatch(cardStatusChangeReducer(payload));
    });
    socket.on("boardCreateResult", (payload) => {
      dispatch(createBoardReducer(payload));
    });
    socket.on("boardDeleteResult", (payload) => {
      dispatch(deleteBoardReducer(payload));
    });
    socket.on("cardCreateResult", (payload) => {
      dispatch(createCardReducer({ data: payload }));
    });
    socket.on("cardDeleteResult", (payload) => {
      dispatch(deleteCardReducer(payload));
    });
    socket.on("cardAllDeleteResult", (payload) => {
      dispatch(cardAllDeleteReducer(payload));
    });
    socket.on("cardCheckResult", (payload) => {
      dispatch(cardCheckReducer(payload));
    });
    socket?.on("boardTitleResult", (payload) => {
      dispatch(changeBoardTitle(payload));
    });
  }, []);

  //보드 내용 불러오기
  const boards = useSelector((state) => state.kanbanSlice.kanbans);
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
  }, [dispatch, getKanbanBoard, params]);

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
          newBoardOrder,
          projectId,
        })
      );
      dispatch(
        endDragSocket({
          type: result.type,
          room: projectId,
          endOrder: newBoardOrder,
          id: draggableId,
        })
      );
    }

    const start = boards.board[source.droppableId];
    const finish = boards.board[destination.droppableId];

    //카드가 다른보드로 이동하지 않을 경우
    if (start === finish && type !== "column") {
      const newCardIds = Array.from(start.cardId);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newBoard = {
        ...start,
        cardId: newCardIds,
      };
      dispatch(
        sortKanbanCard({
          boardId: source.droppableId,
          newBoard,
          startPoint: start.cardId,
        })
      );
      dispatch(
        endDragSocket({
          id: draggableId,
          type: result.type,
          room: projectId,
          endPoint: source.droppableId,
          endOrder: newBoard.cardId,
        })
      );
    } else if (type !== "column") {
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

      //서버와 통신
      dispatch(
        moveSortKanbanCard({
          startPoint: newStart.id,
          endPoint: newFinish.id,
          endOrder: newFinish.cardId,
          startOrder: newStart.cardId,
        })
      );
      //여러명의 중복 드래그를 막기위해 소켓으로 보냄.
      dispatch(
        endDragSocket({
          id: draggableId,
          type: result.type,
          room: projectId,
          startPoint: newStart.id,
          endPoint: newFinish.id,
          startOrder: newStart.cardId,
          endOrder: newFinish.cardId,
        })
      );
    }
  };

  const onDragStart = (result) => {
    dispatch(
      startDragSocket({
        result,
        projectId,
      })
    );
  };

  return (
    <>
      <KanbanFeatures boards={boards}>
        <DragDropContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          style={{ overflow: "auto" }}
        >
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
                  board &&
                  columnOrders?.map((boardId, index) => {
                    const boards = board[boardId];
                    const cards = boards?.cardId?.map((cardId) => card[cardId]);
                    return (
                      <KanbanBoard
                        key={boards.id}
                        boards={boards}
                        cards={cards}
                        index={index}
                        projectId={projectId}
                      />
                    );
                  })}
                {provided.placeholder}

                <InputContainer type="board" projectId={params.projectId} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </KanbanFeatures>
    </>
  );
};

export default KanbanList;
