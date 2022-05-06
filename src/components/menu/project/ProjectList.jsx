import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import styles from "../../../style/menu/_Project.module.scss";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  return (
    <div>
      <ProjectHeader />
      <div className={styles.home_kanban_list}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />

        <div className={styles.add_kanban}>
          <div className={styles.add_kanban_style}>
            <div>새로만들기</div>
            <Icon icon="bi:plus-square-fill" color="black" height="40" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectList;
