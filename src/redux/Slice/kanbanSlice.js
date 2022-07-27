import { createSlice, current } from "@reduxjs/toolkit";
import {
  deleteBoard,
  getKanbanBoard,
  addKanbanCard,
  checkKanbanCard,
  statusChangeKanbanCard,
  getKanbanInviteCode,
  cardAllDelete,
  getProjectUserList,
  deleteProjectUser,
  changeOwnerDB,
} from "../Async/kanban";

const KanbanSlice = createSlice({
  name: "kanbanBoard",
  initialState: {
    kanbans: [
      {
        cards: [],
        board: [],
        columnOrders: [],
      },
    ],
    errorMessage: null,
    inviteCode: "",
  },
  reducers: {
    //보드 추가
    createBoardReducer(state, action) {
      console.log(action.payload);
      state.kanbans.board[action.payload.id] = action.payload;
      if (state.kanbans.columnOrders === undefined) {
        state.kanbans.columnOrders = [action.payload.id.toString()];
      } else {
        state.kanbans.columnOrders = [
          ...state.kanbans.columnOrders,
          action.payload.id.toString(),
        ];
      }
    },
    //보드삭제
    deleteBoardReducer(state, action) {
      const boardId = action.payload.boardId;
      delete state.kanbans.board[boardId];

      const newColumnOrder = state.kanbans.columnOrders.filter(
        (board) => board !== boardId.toString()
      );
      state.kanbans.columnOrders = [...newColumnOrder];
    },
    //카드생성
    createCardReducer(state, action) {
      const items = action.payload.data;
      state.kanbans.cards = {
        ...state.kanbans.cards,
        [items.id]: items,
      };
      state.kanbans.board[items.boardId].cardId.push(items.id);
    },
    //같은 보드사이에서 카드를 변경할때
    sortKanbanCardReducer(state, action) {
      const items = action.payload;
      state.kanbans.board[items.endPoint].cardId = items.endOrder;
    },
    //카드가 보드를 이동할 경우
    sortKanbanCardMoveReducer(state, action) {
      const items = action.payload;
      state.kanbans.board[items.endPoint].cardId = items.endOrder;
      state.kanbans.board[items.startPoint].cardId = items.startOrder;
    },
    //보드끼리 이동
    moveKanbanBoardReducer(state, action) {
      state.kanbans.columnOrders = action.payload.order;
    },
    //보드 타이틀 변경
    changeBoardTitleReducer(state, action) {
      const items = action.payload;
      state.kanbans.board[items.boardId].title = items.title;
    },
    //카드 체크박스(완료, 진행중)변경 상태
    cardCheckReducer(state, action) {
      const items = action.payload;
      const currentCard = state.kanbans.cards[items.cardId];
      currentCard.check = items.check;
      currentCard.status = items.status;
    },
    //카드 스테이터스 변경
    cardStatusChangeReducer(state, action) {
      const items = action.payload;
      const currentCard = state.kanbans.cards[items.cardId];
      currentCard.check = items.check;
      currentCard.status = items.status;
    },
    //카드 삭제
    deleteCardReducer(state, action) {
      const items = action.payload;
      delete state.kanbans.cards[items.boardId];
      const newBoard = state.kanbans.board[items.boardId].cardId.filter(
        (cardId) => cardId.toString() !== items.cardId.toString()
      );

      state.kanbans.board[items.boardId].cardId = newBoard;
    },
    // 게시판 카드 모두 삭제하기
    cardAllDeleteReducer(state, action) {
      state.kanbans.board[action.payload.boardId].cardId = [];
    },
    //카드 맴버 삭제하기
    deleteProjectUserReducer(state, action) {
      state.members = state.members.filter(
        (user) => user.id !== action.payload.userId
      );
    },
    //카드 owner 변경하기
    changeOwnerReducer(state, action) {
      console.log("카드 오너 변경하기", action.payload);
      const items = action.payload;
      console.log(current(state.members[items.sender]));
      state.members[items.sender].owner = 0;
      state.members[items.receiver].owner = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKanbanBoard.fulfilled, (state, action) => {
        state.kanbans = action.payload.kanbans;
      })
      .addCase(getKanbanInviteCode.fulfilled, (state, action) => {
        state.inviteCode = action.payload;
      })
      .addCase(getProjectUserList.fulfilled, (state, action) => {
        state.members = action.payload;
      });
  },
});

export const {
  sortKanbanCardReducer,
  cardOpenReducer,
  sortKanbanCardMoveReducer,
  moveKanbanBoardReducer,
  changeBoardTitleReducer,
  deleteCardReducer,
  createBoardReducer,
  deleteBoardReducer,
  createCardReducer,
  cardCheckReducer,
  cardAllDeleteReducer,
  cardStatusChangeReducer,
  deleteProjectUserReducer,
  changeOwnerReducer,
} = KanbanSlice.actions;

export default KanbanSlice;
