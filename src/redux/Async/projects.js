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
  async ({ title, permission }, thunkAPI) => {
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
        // 목록을 다시 불러와서 정렬하려고 했으나 새로 만든 프로젝트는 맨 위로 가게 바꿈.
        // thunkAPI.dispatch(getProject());
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const bookmarkProject = createAsyncThunk(
  "project/bookmark",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: "/project/bookmark",
        method: "POST",
        data: {
          projectId: projectId,
        },
      });
      if (res.data.ok) {
        console.log(res.data);
        //북마크가 우선순위로 변하기 때문에 다시한번 불러와준다.
        thunkAPI.dispatch(getProject());
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}`,
        method: "DELETE",
      });
      if (res.data.ok) {
        console.log(res.data);
        thunkAPI.dispatch(getProject());
      }
      return res;
    } catch (err) {
      console.log(
        "project를 삭제하는 도중 에러가 발생했습니다. 다시 시도해주세요"
      );
    }
  }
);
