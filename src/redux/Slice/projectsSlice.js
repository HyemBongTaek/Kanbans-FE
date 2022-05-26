import { createSlice } from "@reduxjs/toolkit";
import { addProject, deleteProject, getProject } from "../Async/projects";
import commonSlice from "./commonSlice";

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
      // state.projects.unshift(action.payload.data.project);
    });
  },
});
// export const {} = ProjectsSlice.actions;
export default ProjectsSlice;
