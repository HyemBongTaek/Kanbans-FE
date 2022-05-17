import classNames from "classnames";
import React, { useEffect } from "react";
import ProjectList from "../../components/menu/project/ProjectList";
import styles from "../../style/menu/_Project.module.scss";
import "../../style/common/commonStyle.scss";

const Project = ({ openNav }) => {
  return (
    <div className={openNav ? styles.main_big : styles.main_small}>
      <div className={classNames(styles.kanban_home, "main_layout")}>
        <ProjectList />
      </div>
    </div>
  );
};
export default Project;
