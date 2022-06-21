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
  ImageDelete,
  imageUpload,
} from "../Async/KanbanCardDetail";

const KanbanCardDetailSlice = createSlice({
  name: "KanbanCardDetailSlice",
  initialState: {
    card: [],
    user: [],
    tasks: [],
    images: [],
    comments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKanbanCardDetail.fulfilled, (state, action) => {
        console.log("sdsdsddssdds", action.payload);
        state.card = action.payload.card;
        state.tasks = action.payload.tasks;
        state.images = action.payload.images;
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
      })
      .addCase(checkCardTask.fulfilled, (state, action) => {
        console.log(action.payload);
        const findIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.task.id
        );
        console.log(findIndex);

        let newTasks = state.tasks;
        newTasks[findIndex] = {
          ...newTasks[findIndex],
          check: action.payload.task.check,
        };

        state.tasks = newTasks;
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        state.images.unshift(action.payload);
        console.log("이미지업로드", action.payload);
      })
      .addCase(ImageDelete.fulfilled, (state, action) => {
        console.log("이미지삭제", action.payload);
        const deleteImage = state.images?.filter(
          (el) => el.id !== action.payload.imageId
        );
        state.images = deleteImage;
      });
  },
});

export const {} = KanbanCardDetailSlice.actions;

export default KanbanCardDetailSlice;
