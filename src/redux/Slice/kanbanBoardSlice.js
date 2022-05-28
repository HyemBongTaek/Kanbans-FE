import { createSlice } from "@reduxjs/toolkit";
import {
  addKanbanBoard,
  changeBoardTitle,
  getKanbanBoard,
  sortKanban,
} from "../Async/kanbanboard";

const KanbanBoardSlice = createSlice({
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
        console.log(state.isFetching, "펜딩 아 왜");
      })
      .addCase(getKanbanBoard.rejected, (state, action) => {
        if (action.payload.status === 400) {
          state.kanbans = [];
        }
        state.isFetching = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(changeBoardTitle.fulfilled, (state, action) => {
        const currentKanban = action.payload.boards;
        const newBoard = action.payload.data.updateBoard;
        const newKanbans = {
          cards: currentKanban.cards,
          board: newBoard,
          columnOrders: currentKanban.columnOrders,
        };
        state.kanbans = newKanbans;
      })
      .addCase(sortKanban.fulfilled, (state, action) => {
        const items = action.payload;
        switch (items.type) {
          case "column": {
            state.kanbans.columnOrder = items.newBoardOrder;
            console.log("오더", state.kanbans.columnOrder);
            break;
          }
          case "card": {
          }
        }
      });
  },
});

export const {} = KanbanBoardSlice.actions;

export default KanbanBoardSlice;
