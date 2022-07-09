import { createSlice, current } from "@reduxjs/toolkit";
import {
  addCardComment,
  addCardTask,
  cardShowMembers,
  checkCardTask,
  deleteCardComment,
  deleteCardLabel,
  deleteCardTask,
  deleteProjectLabel,
  editCardComment,
  exitCardMember,
  getCardComment,
  getKanbanCardDetail,
  ImageDelete,
  imageUpload,
  searchLabel,
} from "../Async/KanbanCardDetail";

const KanbanCardDetailSlice = createSlice({
  name: "KanbanCardDetailSlice",
  initialState: {
    card: [],
    users: [],
    tasks: [],
    images: [],
    comments: [],
    label: [],
    saveLabel: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //칸반보드 카드 상세보기 눌렀을 경우 데이터 불러오기
      .addCase(getKanbanCardDetail.fulfilled, (state, action) => {
        console.log("카드디테일내용불러오기", action.payload);
        state.card = action.payload.card;
        state.tasks = action.payload.tasks;
        state.images = action.payload.images;
        state.saveLabel = action.payload.labels;
        state.users = action.payload.users;
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
      })
      .addCase(ImageDelete.fulfilled, (state, action) => {
        const deleteImages = state.images?.filter(
          (el) => el.id !== action.payload.imageId
        );
        state.images = deleteImages;
      })
      .addCase(searchLabel.fulfilled, (state, action) => {
        state.label = action.payload;
      })
      .addCase(deleteProjectLabel.fulfilled, (state, action) => {
        const newDeleteProjectLabel = state.saveLabel?.filter(
          (el) => el.id !== action.payload
        );
        state.label = newDeleteProjectLabel;
      })
      .addCase(cardShowMembers.fulfilled, (state, action) => {
        state.showMembers = action.payload.members;
      })

      //카드에 등록되어 있는 라벨 삭제
      .addCase(deleteCardLabel.fulfilled, (state, action) => {
        console.log(current(state.saveLabel));
        const deleteLabel = state.saveLabel?.filter(
          (label) => label.id !== action.payload
        );
        state.saveLabel = deleteLabel;
      })
      .addCase(exitCardMember.fulfilled, (state, action) => {
        const exitMember = state.users?.filter(
          (user) => user.id !== action.payload
        );
        state.users = exitMember;
      });
  },
});

export const {} = KanbanCardDetailSlice.actions;

export default KanbanCardDetailSlice;
