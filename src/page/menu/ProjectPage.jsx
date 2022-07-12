import classNames from "classnames";
import React, { useEffect } from "react";
import ProjectList from "../../components/Project/ProjectList";
import styles from "../../style/menu/_Project.module.scss";
import "../../style/common/commonStyle.scss";
import ProjectHeader from "../../components/Project/ProjectHeader";

const ProjectPage = () => {
  return (
    <div>
      <div className={styles.kanban_home}>
        <ProjectHeader />
        <ProjectList />
      </div>
    </div>
  );
};
export default ProjectPage;
