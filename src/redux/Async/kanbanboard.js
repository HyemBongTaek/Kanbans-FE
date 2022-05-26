import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

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
        return { data: res.data };
      }
    } catch (err) {
      console.log("작성에러", err.response);
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
