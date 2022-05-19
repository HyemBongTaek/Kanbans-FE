import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";

import styles from "../../../style/menu/_Project.module.scss";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../../redux/Async/projects";

import AddProjectCard from "./AddProjectCard";

const ProjectList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const projectList = useSelector((state) => state.ProjectsSlice.projects);

  return (
    <div>
      <ProjectHeader />
      <div className={styles.home_kanban_list}>
        <div className={styles.add_kanban}>
          <AddProjectCard />
        </div>
        {projectList &&
          projectList?.map((project) => {
            return <ProjectCard items={project} key={project.projectId} />;
          })}
      </div>
    </div>
  );
};
export default ProjectList;
