import { createAsyncThunk } from "@reduxjs/toolkit";
import Apis from "../apis";
import Swal from "sweetalert2";
import {
  addProjectReducer,
  joinProjectReducer,
  updateProjectReducer,
} from "../Slice/projectsSlice";

export const getProject = createAsyncThunk("project/getProject", async () => {
  try {
    const res = await Apis({
      url: "/project",
      method: "GET",
    });
    if (res.data.ok) {
      return { data: res.data };
    }
  } catch (err) {
    throw err;
  }
});

export const addProject = createAsyncThunk(
  "project/addProject",
  async ({ title, permission }, thunkAPI) => {
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
        return thunkAPI.dispatch(addProjectReducer(res.data.project));
      }
    } catch (err) {
      throw err;
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
        //북마크가 우선순위로 변하기 때문에 다시한번 불러와준다.
        thunkAPI.dispatch(getProject());
      }
      return res;
    } catch (err) {
      throw err;
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
        thunkAPI.dispatch(getProject());
      }
      return res;
    } catch (err) {
      throw err;
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ title, projectId, permission }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/${projectId}`,
        method: "PATCH",
        data: {
          title: title,
          permission: permission ? "public" : "private",
        },
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(
          updateProjectReducer({
            title,
            permission: permission ? "public" : "private",
            projectId,
          })
        );
      }
    } catch (err) {
      throw err;
    }
  }
);
//oner아닌 사람 프로젝트 떠나기
export const leaveProject = createAsyncThunk(
  "project/leaveProject",
  async ({ projectId }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/leave/${projectId}`,
        method: "Delete",
      });
      if (res.data.ok) {
        thunkAPI.dispatch(getProject());
      }
      return res;
    } catch (err) {
      throw err;
    }
  }
);

//프로젝트 초대받은 코드 입력해서 프로젝트 입장하기
export const joinProject = createAsyncThunk(
  "project/joinProject",
  async ({ inviteCode }, thunkAPI) => {
    try {
      const res = await Apis({
        url: `/project/join`,
        method: "POST",
        data: {
          inviteCode,
        },
      });
      if (res.data.ok) {
        return thunkAPI.dispatch(joinProjectReducer(res.data.data));
      }
    } catch (err) {
      thunkAPI.rejectWithValue();
    }
  }
);
