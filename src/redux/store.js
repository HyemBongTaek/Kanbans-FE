import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import modalSlice from "./Slice/modalSlice";
import ProjectsSlice from "./Slice/projectsSlice";
import UserSlice from "./Slice/userSlice";

//A non-serializable value was detected in an action, in the path 오류 없애기
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: false,
//   }),

const reducers = combineReducers({
  navSlice: modalSlice.reducer,
  projectsSlice: ProjectsSlice.reducer,
  userSlice: UserSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
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
