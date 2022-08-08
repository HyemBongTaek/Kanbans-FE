import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../store";
import { cardCheckReducer } from "./kanbanSlice";

const SocketSlice = createSlice({
  name: "socket",
  initialState: {},
  reducers: {
    //보드추가
    boardAddSocket(state, action) {
      const items = action.payload;
      socket.emit("boardCreate", {
        room: items.projectId,
        boardId: items.id,
        title: items.title,
      });
    },
    //카드추가
    cardAddSocket(state, action) {
      const items = action.payload;
      socket.emit("cardCreate", {
        room: items.projectId,
        cardId: items.data.id,
        title: items.data.title,
        createdAt: items.data.createdAt,
        boardId: items.boardId,
      });
    },
    //보드 삭제
    boardDeleteSocket(state, action) {
      const items = action.payload;
      socket.emit("boardDelete", {
        room: items.room,
        boardId: items.boardId,
      });
    },
    //카드삭제
    cardDeleteSocket(state, action) {
      const items = action.payload;
      socket.emit("cardDelete", {
        room: items.room,
        cardId: items.cardId,
        boardId: items.boardId,
      });
    },
    //카드 전체 삭제
    cardAllDeleteSocket(state, action) {
      const items = action.payload;
      socket.emit("cardAllDelete", {
        room: items.room,
        boardId: items.boardId,
      });
    },
    //카드 체크박스(완료, 진행중)변경 상태
    cardCheckSocket(state, action) {
      const items = action.payload;
      socket.emit("cardCheck", {
        room: items.room,
        check: items.check,
        cardId: items.cardId,
      });
    },
    //칸반보드 타이틀 변경 감지
    changeBoardTitleSocket(state, action) {
      const items = action.payload;
      socket.emit("boardTitle", {
        room: items.room,
        title: items.title,
        boardId: items.boardId,
      });
    },
    //카드 상태 변경
    cardStatusSocket(state, action) {
      const items = action.payload;
      socket.emit("cardStatus", {
        room: items.room,
        status: items.status,
        cardId: items.cardId,
      });
    },
    //칸반이동 소켓연결
    startDragSocket(state, action) {
      const result = action.payload.result;
      socket.emit("dragStart", {
        type: result.type,
        id: result.draggableId,
      });
    },
    endDragSocket(state, action) {
      const result = action.payload;
      socket.emit("dragEnd", {
        id: result.id,
        startOrder: result.startOrder,
        startPoint: result.startPoint,
        endPoint: result.endPoint,
        endOrder: result.endOrder,
        room: result.room,
        type: result.type,
      });
    },
  },
});

export const {
  startDragSocket,
  endDragSocket,
  boardAddSocket,
  boardDeleteSocket,
  cardAddSocket,
  cardDeleteSocket,
  cardCheckSocket,
  cardAllDeleteSocket,
  changeBoardTitleSocket,
  cardStatusSocket,
} = SocketSlice.actions;
export default SocketSlice;
