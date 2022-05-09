import logo from "./logo.svg";
import "./App.css";
import Main from "./page/Main";
import Project from "./page/menu/Project";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "./components/nav/LeftNav";
import Login from "./components/login/Login";
import KanbanBoards from "./page/menu/kanban/KanbanBoards";

function App() {
  const NavStatus = useSelector((state) => state.navSlice.openNav);

  return (
    <div className="App">
      <BrowserRouter>
        <LeftNav openNav={NavStatus} />
        <Routes>
          <Route path="/*" element={<Main openNav={NavStatus} />} />
          <Route path="/card" element={<KanbanBoards openNav={NavStatus} />} />
          <Route path="/project" element={<Project openNav={NavStatus} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
