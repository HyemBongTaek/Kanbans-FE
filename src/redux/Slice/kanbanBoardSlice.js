import { createSlice } from "@reduxjs/toolkit";
import {
  addKanbanBoard,
  getKanbanBoard,
  sortKanban,
} from "../Async/kanbanboard";

const KanbanBoardSlice = createSlice({
  name: "kanbanBoard",
  initialState: {
    kanbans: [
      {
        board: {},
        cards: {},
        columnOrder: [],
      },
    ],
    isFetching: false,
    errorMessage: null,
  },
  reducers: {},
  // columnOrderReducer: (state, action) => {
  //   console.log("액션", action);
  //   switch (action.payload.type) {
  //     case "column": {
  //       console.log("스마일");
  //     }
  //   },
  // const newboard = items;
  // console.log("확인점", newboard);
  // const newColumnOrder = newboard.columnOrder;
  // console.log("확인용", newColumnOrder);
  // newColumnOrder.splice(items.source.index, 1);
  // newColumnOrder.splice(items.destination.index, 0, items.draggableId);
  //
  // const newKanbans = {
  //   ...items,
  //   columnOrder: newColumnOrder,
  // };
  // state.kanbans = [...newKanbans];
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

      .addCase(addKanbanBoard.fulfilled, (state, action) => {
        console.log("addKanbanBoard", action.payload);
      })

      .addCase(sortKanban.fulfilled, (state, action) => {
        const items = action.payload;
        switch (items.type) {
          case "column": {
            state.kanbans.columnOrder = items.newBoardOrder;
            console.log("오더", state.kanbans.columnOrder);
          }
        }
      });
  },
});

export const {} = KanbanBoardSlice.actions;

export default KanbanBoardSlice;
