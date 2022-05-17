import { configureStore } from "@reduxjs/toolkit";

import navSlice from "./Slice/navSlice";
import ProjectsSlice from "./Slice/projectsSlice";

export const store = configureStore({
  reducer: {
    navSlice: navSlice.reducer,
    ProjectsSlice: ProjectsSlice.reducer,
  },

  //A non-serializable value was detected in an action, in the path 오류 없애기
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
