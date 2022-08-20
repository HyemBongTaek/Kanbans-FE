import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

export const getTimer = createAsyncThunk(
  "timer/getTimer",
  async ({ page }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/alarm?page=${page}`,
        method: "GET",
      });
      if (res.data.ok) {
        return res.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);
export const addTimer = createAsyncThunk(
  "timer/addTimer",
  async ({ time, createdAt }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/alarm`,
        method: "PUT",
        data: {
          createdAt,
          time,
        },
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);
