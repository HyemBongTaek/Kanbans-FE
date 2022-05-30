import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import commonSlice from "./Slice/commonSlice";
import ProjectsSlice from "./Slice/projectsSlice";
import UserSlice from "./Slice/userSlice";
import KanbanBoardSlice from "./Slice/kanbanBoardSlice";

//A non-serializable value was detected in an action, in the path 오류 없애기
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: false,
//   }),

const reducers = combineReducers({
  commonSlice: commonSlice.reducer,
  projectsSlice: ProjectsSlice.reducer,
  userSlice: UserSlice.reducer,
  kanbanSlice: KanbanBoardSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,

  // persist제외
  // blacklist: ["kanbanSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
