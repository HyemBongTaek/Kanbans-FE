import React, { useState } from "react";

import styles from "./style/_ProjectHeader.module.scss";
import { useSelector } from "react-redux";

const ProjectHeader = ({ setIsJoin }) => {
  const userName = useSelector((state) => state.userSlice.userInfo.name);

  return (
    <div className={styles.home_header}>
      <div>
        {userName}
        <span>님의 프로젝트</span>
      </div>
      <div className={styles.join_project}>
        <button onClick={() => setIsJoin((pre) => !pre)}>초대코드 입력</button>
      </div>
    </div>
  );
};

export default ProjectHeader;
