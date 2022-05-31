import { createSlice, current } from "@reduxjs/toolkit";
import {
  addKanbanBoard,
  changeBoardTitle,
  deleteBoard,
  getKanbanBoard,
  addKanbanCard,
  sortKanbanBoard,
  sortKanbanCard,
} from "../Async/kanban";

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

      .addCase(sortKanbanBoard.fulfilled, (state, action) => {
        const items = action.payload;
        state.kanbans.columnOrders = items.newBoardOrder;
      })

      .addCase(sortKanbanCard.fulfilled, (state, action) => {
        console.log("ㄴㄴㄴㄴㄴㄴㄴ", action.payload);
        if (action.payload.boardMove === false) {
          const newBoard = action.payload.newBoard;
          console.log(newBoard);
          const newKanban = {
            ...state.kanbans,
            board: {
              ...state.kanbans.board,
              [newBoard?.id]: newBoard,
            },
          };
          state.kanbans = newKanban;
        }
        if (action.payload.boardMove === true) {
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
          state.kanbans = newKanban;
        }
      });
  },
});

export const {} = KanbanSlice.actions;

export default KanbanSlice;
