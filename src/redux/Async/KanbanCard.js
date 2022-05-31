import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

export const addKanbanCard = createAsyncThunk(
  "kanban/addKanbanCard",
  async ({ boardId, title }) => {
    try {
      const res = await Apis({
        url: `board/${boardId}/card`,
        method: "POST",
        data: {
          title,
        },
      });
      if (res.data.ok) {
        return { data: res.data.newCard, boardId };
      }
    } catch (err) {
      console.log("에러", err);
    }
  }
);
