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
    isFetching: false,
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
      console.log("current", current(state.kanbans));
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
      console.log("보드에서이동", action.payload);
      state.kanbans.board[items.endPoint].cardId = items.endOrder;
    },
    //카드가 보드를 이동할 경우
    sortKanbanCardMoveReducer(state, action) {
      console.log("카드가 보드를 이동할 경우", action.payload);
      const items = action.payload;
      state.kanbans.board[items.endPoint].cardId = items.endOrder;
      state.kanbans.board[items.startPoint].cardId = items.startOrder;
    },
    //보드끼리 이동
    moveKanbanBoardReducer(state, action) {
      console.log("보드끼리의 이동", action.payload);
      state.kanbans.columnOrders = action.payload.order;
    },
    //보드 타이틀 변경
    changeBoardTitleReducer(state, action) {
      const items = action.payload;
      state.kanbans.board[items.boardId].title = items.title;
    },
    //카드 체크박스(완료, 진행중)변경 상태
    cardCheckReducer(state, action) {
      console.log("체크박스", action.payload);
      const items = action.payload;
      const currentCard = state.kanbans.cards[items.cardId];
      currentCard.check = items.check;
      currentCard.status = items.status;
    },
    //카드 스테이터스 변경
    cardStatusChangeReducer(state, action) {
      console.log("카드스테이터스변경", action.payload);
      const items = action.payload;
      const currentCard = state.kanbans.cards[items.cardId];
      currentCard.check = items.check;
      currentCard.status = items.status;
    },
    //카드 삭제
    deleteCardReducer(state, action) {
      console.log("카드삭제 리듀서", action.payload);
      const items = action.payload;

      console.log("삭제확인", items.boardId, items.cardId);
      delete state.kanbans.cards[items.boardId];
      const newBoard = state.kanbans.board[items.boardId].cardId.filter(
        (cardId) => cardId.toString() !== items.cardId.toString()
      );

      state.kanbans.board[items.boardId].cardId = newBoard;
      // state.kanbans.board[items.boardId].cardId = items.cardOrder;
      // console.log(current(state.kanbans));
    },
    // 게시판 카드 모두 삭제하기
    cardAllDeleteReducer(state, action) {
      console.log("카드전체삭제", action.payload);
      state.kanbans.board[action.payload.boardId].cardId = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKanbanBoard.fulfilled, (state, action) => {
        console.log("확인", action.payload);
        state.isFetching = false;
        state.kanbans = action.payload.kanbans;
      })
      // .addCase(deleteBoard.fulfilled, (state, action) => {
      //   const boardId = action.payload.boardId;
      //   const newBoard = state.kanbans.board;
      //   delete newBoard[boardId];
      //   const newColumnOrder = state.kanbans.columnOrders.filter(
      //     (board) => board !== boardId.toString()
      //   );
      //   const newKanbans = {
      //     cards: state.kanbans.cards,
      //     board: newBoard,
      //     columnOrders: newColumnOrder,
      //   };
      //   state.kanbans = newKanbans;
      // })
      // .addCase(addKanbanCard.fulfilled, (state, action) => {
      //   const newCardId = action.payload.data.id;
      //
      //   const boardId = action.payload.boardId;
      //   const card = state.kanbans.board[boardId];
      //   card.cardId = [...card.cardId, newCardId];
      //
      //   const newKanban = {
      //     ...state.kanbans,
      //     cards: {
      //       ...state.kanbans.cards,
      //       [newCardId]: action.payload.data,
      //     },
      //     board: {
      //       ...state.kanbans.board,
      //       [boardId]: card,
      //     },
      //   };
      //   state.kanbans = newKanban;
      // })
      // .addCase(cardAllDelete.fulfilled, (state, action) => {
      //   state.kanbans.board[action.payload].cardId = [];
      // })
      // // .addCase(checkKanbanCard.fulfilled, (state, action) => {
      // //   const currentCard = state.kanbans.cards[action.payload.cardId];
      // //   currentCard.check = action.payload.res.check;
      // //   currentCard.status = action.payload.res.status;
      // // })
      // .addCase(statusChangeKanbanCard.fulfilled, (state, action) => {
      //   const currentCard = state.kanbans.cards[action.payload.cardId];
      //   currentCard.check = action.payload.res.check;
      //   currentCard.status = action.payload.res.changedStatus;
      // })
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
} = KanbanSlice.actions;

export default KanbanSlice;
