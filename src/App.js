import logo from "./logo.svg";
import "./App.scss";
import Main from "./page/main/Main";
import Project from "./page/menu/Project";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/layout/Layout";

import Login from "./components/menu/login/Login";
import Profile from "./page/menu/Profile";
import KanbanBoards from "./page/menu/kanban/KanbanBoards";
import KaKaoLoginHandler from "./components/menu/login/KaKaoLoginHandler";
import { GoogleLoginHandler } from "./components/menu/login/GoogleLoginHandler";
import React from "react";
import Timer from "./page/menu/Timer";
import { persistStore } from "redux-persist";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const NavStatus = useSelector((state) => state.commonSlice.openNav);

  //로그인이 되어있지 않는 경우 메인화면으로 돌아가게함.
  function RequireAuth({ children, redirectTo }) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to={redirectTo} />;
  }

  //로그인이 되어있는 경우
  function RejectAuth({ children, redirectTo }) {
    const token = localStorage.getItem("token");
    return !token ? children : <Navigate to={redirectTo} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Layout openNav={NavStatus}>
          <Routes>
            <Route path="/" element={<Main openNav={NavStatus} />} />
            <Route path="/board" element={<KanbanBoards />}>
              <Route path=":projectId" element={<KanbanBoards />} />
            </Route>
            <Route path="/timer" element={<Timer />} />
            <Route
              path="/profile"
              element={
                <RequireAuth redirectTo="/">
                  <Profile openNav={NavStatus} />
                </RequireAuth>
              }
            />
            <Route
              path="/project/*"
              element={
                <RequireAuth redirectTo="/">
                  <Project openNav={NavStatus} />
                </RequireAuth>
              }
            >
              {/*<Route path=":projectId" element={<KanbanBoards />} />*/}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/kakao/" element={<KaKaoLoginHandler />} />
            <Route path="/oauth/google/" element={<GoogleLoginHandler />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
