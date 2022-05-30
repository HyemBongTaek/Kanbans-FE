import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

//칸반보드 불러오기
export const getKanbanBoard = createAsyncThunk(
  "kanban/getKanbanBoard",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${projectId}`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data;
      }
    } catch (err) {
      if (err.response.status === 400) {
        return thunkAPI.rejectWithValue(err.response);
      }
      return console.log(err.response.data.message);
    }
  }
);

// 보드 추가하기
export const addKanbanBoard = createAsyncThunk(
  "kanban/addKanbanBoard",
  async ({ projectId, title }, thunkAPI) => {
    console.log("작성", projectId, title);
    try {
      const res = await Apis({
        url: `/board`,
        method: "POST",
        data: {
          title,
          projectId: projectId,
        },
      });
      if (res.data.ok) {
        console.log("데이터", res.data);
        thunkAPI.dispatch(getKanbanBoard({ projectId }));
      }
    } catch (err) {
      console.log("작성에러", err.response);
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);
// 보드 삭제하기
export const deleteBoard = createAsyncThunk(
  "kanban/deleteBoard",
  async ({ boardId, boards }, thunkAPI) => {
    console.log("이거 보드아이디 맞음?", boardId);
    try {
      const res = await Apis({
        url: `/board/${boardId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        return { boardId: boardId };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

//보드 타이틀 변경
export const changeBoardTitle = createAsyncThunk(
  "kanban/changeBoardTitle",
  async ({ boardId, title }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${boardId}`,
        method: "PATCH",
        data: {
          title,
        },
      });
      if (res.data.ok) {
        return { data: res.data };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

//칸반보드 이동

export const sortKanban = createAsyncThunk(
  "kanban/sortKanban",
  async ({
    newBoardOrder,
    sourceId,
    destinationId,
    sourceIndex,
    destinationIndex,
    draggableId,
    type,
    columnOrder,
    projectId,
  }) => {
    try {
      if (type === "column") {
        const res = await Apis({
          url: `/board/${projectId}/board-location`,
          method: "PATCH",
          data: {
            boardOrder: newBoardOrder,
          },
        });
        if (res.data.ok) {
          return {
            sourceId,
            destinationId,
            sourceIndex,
            destinationIndex,
            draggableId,
            type,
            columnOrder,
            newBoardOrder,
          };
        }
      }
    } catch (err) {
      console.log("칸반보드 이동 에러");
    }
  }
);
