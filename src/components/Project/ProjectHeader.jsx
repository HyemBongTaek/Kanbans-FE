import React from "react";

import styles from "./style/_ProjectHeader.module.scss";
import SearchInput from "../common/SearchInput";
import { useNavigate } from "react-router-dom";

const ProjectHeader = () => {
  const navigate = useNavigate();

  const joinProjectClick = () => {
    navigate("/join/project/");
  };

  return (
    <div className={styles.home_header}>
      <div>헹구님의 프로젝트</div>
      <div onClick={joinProjectClick}>참가하기</div>
      <div>
        <SearchInput />
      </div>
    </div>
  );
};

export default ProjectHeader;
