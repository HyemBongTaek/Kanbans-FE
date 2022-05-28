import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import { getProject } from "./projects";
import { Switch } from "react-router-dom";

export const getKanbanBoard = createAsyncThunk(
  "kanban/getKanbanBoard",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/board/${projectId}`,
        method: "GET",
      });
      if (res.data.ok) {
        console.log("데이터", res.data);
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
          project_id: projectId,
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
//
// export const deleteBoard = createAsyncThunk(
//   "kanban/deleteBoard",
//   asycn({ projectId })
// );

export const changeBoardTitle = createAsyncThunk(
  "kanban/changeBoardTitle",
  async ({ boardId, title, boards }, thunkAPI) => {
    console.log("이거확인점", title, boardId, boards);
    try {
      const res = await Apis({
        url: `/board/${boardId}`,
        method: "PATCH",
        data: {
          title,
        },
      });
      if (res.data.ok) {
        return { data: res.data, boards: boards };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

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
  }) => {
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
);
