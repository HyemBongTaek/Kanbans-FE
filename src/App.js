import React, { useLayoutEffect, useState } from "react";
import "./App.scss";

import { Navigate, Route, Router, Routes } from "react-router-dom";
import { getCookie } from "./components/Login/utils/cookie";

import Layout from "./components/layout/Layout";
import Main from "./page/main/Main";
import ProjectPage from "./page/menu/ProjectPage";
import Login from "./components/Login/Login";
import Profile from "./page/menu/Profile";
import KanbanBoards from "./page/menu/KanbanBoards";
import KaKaoLoginHandler from "./components/Login/KaKaoLoginHandler";
import GoogleLoginHandler from "./components/Login/GoogleLoginHandler";
import NaverLoginHandler from "./components/Login/NaverLoginHandler";
import Timer from "./page/menu/Timer";
import Invite from "./components/Kanban/KanbanInvite/Invite";
import KanbanCardDetail from "./page/menu/KanbanCardDetail";
import MemberPage from "./page/menu/MemberPage";

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
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
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
                  <Timer />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth redirectTo="/">
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/project/*"
              element={
                <RequireAuth redirectTo="/">
                  <ProjectPage />
                </RequireAuth>
              }
            />
            <Route
              path="/member"
              element={
                <RequireAuth redirectTo="/">
                  <MemberPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/kakao/" element={<KaKaoLoginHandler />} />
            <Route path="/oauth/google/" element={<GoogleLoginHandler />} />
            <Route path="/oauth/naver/" element={<NaverLoginHandler />} />
            <Route path="/invite" element={<Invite />} />
          </Routes>
        </Layout>
      </CustomRouter>
    </div>
  );
}

export default App;
