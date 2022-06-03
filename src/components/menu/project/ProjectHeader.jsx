import React from "react";

import styles from "../../../style/menu/_Project.module.scss";
import SearchInput from "../../common/SearchInput";

const ProjectHeader = () => {
  return (
    <div className={styles.home_header}>
      <div>헹구님의 프로젝트</div>
      <div>
        <SearchInput />
      </div>
    </div>
  );
};

export default ProjectHeader;
