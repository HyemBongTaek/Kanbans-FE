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
      <div>{userName}님의 프로젝트</div>
      <div onClick={joinProjectClick}>참가하기</div>
      {/*<div>*/}
      {/*  <SearchInput />*/}
      {/*</div>*/}
    </div>
  );
};

export default ProjectHeader;
