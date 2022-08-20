import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ProjectList from "../../components/Project/ProjectList";
import styles from "../../style/menu/_Project.module.scss";
import ProjectHeader from "../../components/Project/ProjectHeader";

const ProjectPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  return (
    <>
      <div className={styles.kanban_home} isJoin={isJoin}>
        <div className={styles.header}>
          <ProjectHeader setIsJoin={setIsJoin} />
        </div>
        <ProjectList isjoin={isJoin} setIsJoin={setIsJoin} />
      </div>
    </>
  );
};
export default ProjectPage;
