import classNames from "classnames";
import React, { useEffect } from "react";
import ProjectList from "../../components/Project/ProjectList";
import styles from "../../style/menu/_Project.module.scss";
import ProjectHeader from "../../components/Project/ProjectHeader";

const ProjectPage = () => {
  return (
    <>
      <div className={styles.kanban_home}>
        <div className={styles.header}>
          <ProjectHeader />
        </div>
        <ProjectList />
      </div>
    </>
  );
};
export default ProjectPage;
