import React, { useLayoutEffect, useState } from "react";
import "./App.scss";

import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "./components/menu/login/utils/cookie";

import Layout from "./components/layout/Layout";
import Main from "./page/main/Main";
import Project from "./page/menu/Project";
import Login from "./components/menu/login/Login";
import Profile from "./page/menu/Profile";
import KanbanBoards from "./page/menu/kanban/KanbanBoards";
import KaKaoLoginHandler from "./components/menu/login/KaKaoLoginHandler";
import GoogleLoginHandler from "./components/menu/login/GoogleLoginHandler";
import NaverLoginHandler from "./components/menu/login/NaverLoginHandler";
import Timer from "./page/menu/Timer";
import KanbanInvite from "./components/menu/kanban/KanbanInvite";
import TestCheck from "./components/menu/kanban/testcheck";
import KanbanCardDetail from "./page/menu/kanban/KanbanCardDetail";
import JoinProject from "./page/menu/JoinProject";
import LoadingSpinner from "./components/menu/utils/LoadingSpinner";

import { history } from "./history";

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

function App() {
  const NavStatus = useSelector((state) => state.commonSlice.openNav);

  //로그인이 되어있지 않는 경우 메인화면으로 돌아가게함.
  function RequireAuth({ children, redirectTo }) {
    const token = getCookie("cocoriLogin");
    return token ? children : <Navigate to={redirectTo} />;
  }
  //로그인으로 다시넘어가게
  function LoginAuth({ children, redirectTo }) {
    const token = getCookie("cocoriLogin");
    return token ? children : <Navigate to={redirectTo} />;
  }

  //로그인이 되어있는 경우
  function RejectAuth({ children, redirectTo }) {
    const token = getCookie("cocoriLogin");
    return !token ? children : <Navigate to={redirectTo} />;
  }

  return (
    <div className="App">
      <CustomRouter history={history}>
        <Layout openNav={NavStatus}>
          <Routes>
            <Route path="/" element={<Main openNav={NavStatus} />} />
            <Route
              path="/board"
              element={
                <RequireAuth redirectTo="/">
                  <KanbanBoards />
                </RequireAuth>
              }
            >
              <Route
                path=":projectId"
                element={
                  <RequireAuth redirectTo="/">
                    <KanbanBoards />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="/card"
              element={
                <RequireAuth redirectTo="/">
                  <KanbanCardDetail />
                </RequireAuth>
              }
            >
              <Route
                path=":cardId"
                element={
                  <RequireAuth redirectTo="/">
                    <KanbanCardDetail />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="/timer"
              element={
                <RequireAuth redirectTo="/">
                  <Timer />{" "}
                </RequireAuth>
              }
            />
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
            />
            <Route path="/join/project/" element={<JoinProject />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/kakao/" element={<KaKaoLoginHandler />} />
            <Route path="/oauth/google/" element={<GoogleLoginHandler />} />
            <Route path="/oauth/naver/" element={<NaverLoginHandler />} />
            <Route path="/test" element={<KanbanInvite />} />
            <Route path="/tests" element={<TestCheck />} />
            <Route path="/testss" element={<LoadingSpinner />} />
          </Routes>
        </Layout>
      </CustomRouter>
    </div>
  );
}

export default App;
