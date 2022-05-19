import { createSlice } from "@reduxjs/toolkit";
import { addProject, deleteProject, getProject } from "../Async/projects";

const ProjectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProject.fulfilled, (state, action) => {
      state.projects = action.payload.data.projects;
    });
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.projects.unshift(action.payload.data.project);
    });
  },
});

export default ProjectsSlice;
