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
  reducers: {},
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
        console.log("===카드", items.newStartId);

        const newKanban = {
          ...state.kanbans,
          board: {
            ...state.kanbans.board,
            [items.newStartId]: items.newStart,
            [items.newFinishId]: items.newFinish,
          },
        };
        console.log("========뉴칸반", newKanban);
        state.kanbans = newKanban;
      })
      .addCase(sortKanbanCard.fulfilled, (state, action) => {
        console.log("ㄴㄴㄴㄴㄴㄴㄴ", action.payload);

        const newBoard = action.payload.newBoard;
        console.log("왜오류가나냐", newBoard);
        console.log("sdfsdfsdf", current(state.kanbans.board));
        const newKanban = {
          ...state.kanbans.board,
          [newBoard.id]: newBoard,
        };
        state.kanbans.board = newKanban;

        //   else {
        //     const items = action.payload;
        //     console.log("===카드", items.newStartId);
        //
        //     const newKanban = {
        //       ...state.kanbans,
        //       board: {
        //         ...state.kanbans.board,
        //         [items.newStartId]: items.newStart,
        //         [items.newFinishId]: items.newFinish,
        //       },
        //     };
        //     console.log("========뉴칸반", newKanban);
        //     state.kanbans = newKanban;
        //   }
      });
  },
});

export const {} = KanbanSlice.actions;

export default KanbanSlice;
