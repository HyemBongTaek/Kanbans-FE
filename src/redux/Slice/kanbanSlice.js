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
        console.log("확인용", action.payload);
        const newCardId = action.payload.data.id;
        const boardId = action.payload.data.boardId;
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
      // .addCase(sortKanbanCard.fulfilled, (state, action) => {
      //   const newBoard = action.payload.newBoard;
      //   const newKanban = {
      //     ...state.kanbans.board,
      //     [newBoard.id]: newBoard,
      //   };
      //   state.kanbans.board = newKanban;
      // })
      .addCase(checkKanbanCard.fulfilled, (state, action) => {
        const currentCard = state.kanbans.cards[action.payload.cardId];
        console.log("체크에욤", action.payload.res);
        currentCard.check = action.payload.res.check;
        currentCard.status = action.payload.res.status;
      });
  },
});

export const { sortKanbanCardReducer } = KanbanSlice.actions;

export default KanbanSlice;
