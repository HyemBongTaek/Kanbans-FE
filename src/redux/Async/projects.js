import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";

export const getProject = createAsyncThunk("project/getProject", async () => {
  try {
    const res = await Apis({
      url: "/project",
      method: "GET",
    });
    if (res.data.ok) {
      console.log("데이터", res.data);
      return { data: res.data };
    }
  } catch (err) {
    console.log(err);
    return false;
  }
});

export const addProject = createAsyncThunk(
  "project/addProject",
  async ({ title, permission }) => {
    console.log("타이틀", title, permission);
    try {
      const res = await Apis({
        url: "/project",
        method: "POST",
        data: {
          title: title,
          permission: permission,
        },
      });
      if (res.data.ok) {
        console.log(res.data);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const bookmarkProject = createAsyncThunk(
  "project/bookmark",
  async ({ projectId, bookmark }) => {
    console.log("북마크디비", projectId, bookmark);
  }
);
