import React, { useState } from "react";

import LoginModal from "./LoginModal";
import KanBanCardDetail from "../menu/kanban/KanbanCardDetail";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const loginModal = () => {
    setIsOpen(!isOpen);
  };
  const detailModal = () => {
    setIsDetail(!isDetail);
  };
  return (
    <div style={{ marginLeft: "200px" }}>
      <button type="button" onClick={loginModal}>
        로그인
      </button>
      {isOpen && <LoginModal setIsOpen={setIsOpen} />}
      {isDetail && <KanBanCardDetail setIsDetail={setIsDetail} />}
      <button type="button" onClick={detailModal}>
        디테일
      </button>
    </div>
  );
};

export default Login;
