import { createSlice, current } from "@reduxjs/toolkit";
import {
  addKanbanBoard,
  changeBoardTitle,
  deleteBoard,
  getKanbanBoard,
  addKanbanCard,
  sortKanbanBoard,
  sortKanbanCard,
  moveSortKanbanCard,
  checkKanbanCard,
  statusChangeKanbanCard,
  deleteKanbanCard,
  getKanbanInviteCode,
  clearAllKanbanCards,
} from "../Async/kanban";
import { Switch } from "react-router-dom";

const KanbanSlice = createSlice({
  name: "kanbanBoard",
  initialState: {
    kanbans: [
      {
        // board: {},
        // cards: {},
        // columnOrder: [],
      },
    ],
    isFetching: false,
    errorMessage: null,
    inviteCode: "",
  },
  reducers: {
    //카드가 이동할때 번쩍거림 방지를 위해 두개로 나눠줌.
    sortKanbanCardReducer(state, action) {
      const newBoard = action.payload.newBoard;
      const newKanban = {
        ...state.kanbans.board,
        [newBoard.id]: newBoard,
      };
      state.kanbans.board = newKanban;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKanbanBoard.fulfilled, (state, action) => {
        console.log("겟", action.payload);
        state.isFetching = false;
        state.kanbans = action.payload.kanbans;
      })
      .addCase(getKanbanBoard.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getKanbanBoard.rejected, (state, action) => {
        if (action.payload.status === 400) {
          state.kanbans = [];
        }
        state.isFetching = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(changeBoardTitle.fulfilled, (state, action) => {
        const newBoard = action.payload.data.updateBoard;
        const newKanbans = {
          cards: state.kanbans.cards,
          board: newBoard,
          columnOrders: state.kanbans.columnOrders,
        };
        state.kanbans = newKanbans;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        const boardId = action.payload.boardId;
        const newBoard = state.kanbans.board;
        delete newBoard[boardId];
        const newColumnOrder = state.kanbans.columnOrders.filter(
          (board) => board !== boardId.toString()
        );
        const newKanbans = {
          cards: state.kanbans.cards,
          board: newBoard,
          columnOrders: newColumnOrder,
        };
        state.kanbans = newKanbans;
      })
      .addCase(addKanbanCard.fulfilled, (state, action) => {
        console.log("이거 확인좀하자", action.payload);
        const newCardId = action.payload.data.id;

        const boardId = action.payload.boardId;
        const card = state.kanbans.board[boardId];
        card.cardId = [...card.cardId, newCardId];

        const newKanban = {
          ...state.kanbans,
          cards: {
            ...state.kanbans.cards,
            [newCardId]: action.payload.data,
          },
          board: {
            ...state.kanbans.board,
            [boardId]: card,
          },
        };
        state.kanbans = newKanban;
      })

      .addCase(deleteKanbanCard.fulfilled, (state, action) => {
        console.log("삭제", action.payload);
        const newCards = state.kanbans.cards;
        delete newCards[action.payload.cardId];
        delete newCards[action.payload.cardId];
        const deleteCardId = state.kanbans.board[
          action.payload.boardId
        ].cardId.filter((card) => card !== action.payload.cardId);
        const newBoard = {
          ...state.kanbans.board[action.payload.boardId],
          cardId: deleteCardId,
        };
        const newKanbans = {
          ...state.kanbans,
          board: {
            ...state.kanbans.board,
            [action.payload.boardId]: newBoard,
          },
          cards: {
            ...newCards,
          },
        };
        state.kanbans = newKanbans;
      })

      .addCase(clearAllKanbanCards.fulfilled, (state, action) => {
        state.kanbans.board[action.payload].cardId = [];
      })

      .addCase(sortKanbanBoard.fulfilled, (state, action) => {
        const items = action.payload;
        state.kanbans.columnOrders = items.newBoardOrder;
      })
      .addCase(moveSortKanbanCard.fulfilled, (state, action) => {
        const items = action.payload;

        const newKanban = {
          ...state.kanbans,
          board: {
            ...state.kanbans.board,
            [items.newStartId]: items.newStart,
            [items.newFinishId]: items.newFinish,
          },
        };
        state.kanbans = newKanban;
      })
      .addCase(checkKanbanCard.fulfilled, (state, action) => {
        const currentCard = state.kanbans.cards[action.payload.cardId];
        currentCard.check = action.payload.res.check;
        currentCard.status = action.payload.res.status;
      })
      .addCase(statusChangeKanbanCard.fulfilled, (state, action) => {
        const currentCard = state.kanbans.cards[action.payload.cardId];
        currentCard.check = action.payload.res.check;
        currentCard.status = action.payload.res.changedStatus;
      })
      .addCase(getKanbanInviteCode.fulfilled, (state, action) => {
        state.inviteCode = action.payload;
      });
  },
});

export const { sortKanbanCardReducer, cardOpenReducer } = KanbanSlice.actions;

export default KanbanSlice;
