import { createSlice, current } from "@reduxjs/toolkit";
import {
  addProject,
  deleteProject,
  getProject,
  updateProject,
} from "../Async/projects";
import commonSlice from "./commonSlice";

const ProjectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    updateProjectReducer(state, action) {
      const items = action.payload;
      const index = state.projects.findIndex(
        (project) => project.projectId.toString() === items.projectId.toString()
      );
      if (items.title) {
        state.projects[index].title = items.title;
      } else if (items.permission) {
        state.projects[index].permission = items.permission;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.projects = action.payload.data.projects;
    });
  },
});
export const { updateProjectReducer } = ProjectsSlice.actions;
export default ProjectsSlice;
