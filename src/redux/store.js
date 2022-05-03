import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./Modules/navSlice";

export const store = configureStore({
  reducer: {
    navSlice: navSlice.reducer,
  },
  //A non-serializable value was detected in an action, in the path 오류 없애기
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
