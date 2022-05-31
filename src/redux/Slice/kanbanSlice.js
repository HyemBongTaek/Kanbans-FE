import { createSlice, current } from "@reduxjs/toolkit";
import {
  addKanbanBoard,
  changeBoardTitle,
  deleteBoard,
  getKanbanBoard,
  sortKanban,
} from "../Async/kanbanboard";
import { addKanbanCard } from "../Async/KanbanCard";

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
        const boardId = action.payload.boardId;
        const card = state.kanbans.board[boardId];
        card.cardId = [...card.cardId, action.payload.data.cardId];

        const newState = {
          ...state.kanbans,
          cards: {
            ...state.kanbans.cards,
            [action.payload.data.cardId]: action.payload.data,
          },
          board: {
            ...state.kanbans.board,
            [boardId]: card,
          },
        };
        state.kanbans = newState;
      })

      .addCase(sortKanban.fulfilled, (state, action) => {
        const items = action.payload;
        switch (items.type) {
          case "column": {
            state.kanbans.columnOrders = items.newBoardOrder;
            break;
          }
          case "card": {
          }
        }
      });
  },
});

export const {} = KanbanSlice.actions;

export default KanbanSlice;
