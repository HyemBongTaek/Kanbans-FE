import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

import commonSlice from "./Slice/commonSlice";
import ProjectsSlice from "./Slice/projectsSlice";
import UserSlice from "./Slice/userSlice";
import KanbanSlice from "./Slice/kanbanSlice";
import KanbanCardDetailSlice from "./Slice/KanbanCardDetailSlice";
import { kanbanApi } from "./Slice/kanbanApi";

//A non-serializable value was detected in an action, in the path 오류 없애기
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: false,
//   }),

const reducers = combineReducers({
  [kanbanApi.reducerPath]: kanbanApi.reducer,
  commonSlice: commonSlice.reducer,
  projectsSlice: ProjectsSlice.reducer,
  userSlice: UserSlice.reducer,
  kanbanSlice: KanbanSlice.reducer,
  cardDetailSlice: KanbanCardDetailSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  // persist제외
  blacklist: ["cardDetailSlice"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(kanbanApi.middleware),
});

// setupListeners(store.dispatch);
export default store;
