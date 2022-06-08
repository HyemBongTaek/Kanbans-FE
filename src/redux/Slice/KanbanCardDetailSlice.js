import { createSlice, current } from "@reduxjs/toolkit";
import {
  addCardComment,
  addCardTask,
  checkCardTask,
  deleteCardTask,
  getCardComment,
  getKanbanCardDetail,
} from "../Async/KanbanCardDetail";

const KanbanCardDetailSlice = createSlice({
  name: "KanbanCardDetailSlice",
  initialState: {
    card: [],
    user: [],
    tasks: [],
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKanbanCardDetail.fulfilled, (state, action) => {
        console.log(action.payload);
        state.card = action.payload.card;
        state.tasks = action.payload.tasks;
      })
      .addCase(addCardTask.fulfilled, (state, action) => {
        const newTask = {
          id: action.payload.id,
          content: action.payload.content,
          cardId: action.payload.cardId,
          check: false,
        };
        const newTasks = [...state.tasks];
        newTasks.push(newTask);

        state.tasks = newTasks;
      })
      .addCase(deleteCardTask.fulfilled, (state, action) => {
        const newTasks = state.tasks.filter(
          (tasks) => tasks.id !== action.payload.id
        );

        state.tasks = newTasks;
      })
      .addCase(getCardComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addCardComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      });
    // .addCase(checkCardTask.fulfilled, (state, action) => {
    //   const newTasks = state.tasks.filter(
    //     (task) => task.id === action.payload.task.id
    //   );
    //   console.log(current(newTasks));
    //
    //   console.log("sddsdfsddsffsds", action.payload.task.id);
    // });
  },
});

export const {} = KanbanCardDetailSlice.actions;

export default KanbanCardDetailSlice;
