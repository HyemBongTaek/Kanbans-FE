import { createSlice, current } from "@reduxjs/toolkit";
import {
  addCardComment,
  addCardTask,
  checkCardTask,
  deleteCardComment,
  deleteCardTask,
  editCardComment,
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
        state.card = action.payload.card;
        state.tasks = action.payload.tasks;
      })
      .addCase(addCardTask.fulfilled, (state, action) => {
        const newTasks = [...state.tasks];
        newTasks.push(action.payload);

        state.tasks = newTasks;
      })
      .addCase(deleteCardTask.fulfilled, (state, action) => {
        const newTasks = state.tasks.filter(
          (tasks) => tasks.id !== action.payload.id
        );

        state.tasks = newTasks;
      })
      .addCase(getCardComment.fulfilled, (state, action) => {
        state.comments = action.payload.comment;
      })
      .addCase(addCardComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(deleteCardComment.fulfilled, (state, action) => {
        const newComments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
        state.comments = newComments;
      })
      .addCase(editCardComment.fulfilled, (state, action) => {
        const findIndex = state.comments.findIndex(
          (comment) => comment.id === action.payload.id
        );
        let newComments = state.comments;
        newComments[findIndex] = {
          ...newComments[findIndex],
          content: action.payload.content,
        };

        state.comments = newComments;
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
