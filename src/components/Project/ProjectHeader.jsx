import React, { useState } from "react";

import styles from "./style/_ProjectHeader.module.scss";
import SearchInput from "../common/SearchInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectHeader = () => {
  const navigate = useNavigate();

  const joinProjectClick = () => {
    navigate("/join/project/");
  };

  const userName = useSelector((state) => state.userSlice.userInfo.name);

  console.log(userName);

  return (
    <div className={styles.home_header}>
      <div>
        {userName}
        <span>님의 프로젝트</span>
      </div>
      <div className={styles.join_project}>
        <button onClick={joinProjectClick}>초대코드 입력</button>
      </div>
      {/*<div>*/}
      {/*  <SearchInput />*/}
      {/*</div>*/}
    </div>
  );
};

export default ProjectHeader;
