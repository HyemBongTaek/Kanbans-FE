import React, { useEffect, useRef, useState } from "react";

import styles from "./style/_ProjectList.module.scss";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../redux/Async/projects";

import ProjectAddCard from "./ProjectAddCard";
import { useParams } from "react-router-dom";

const ProjectList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch, params]);
  const projectList = useSelector((state) => state.projectsSlice.projects);

  return (
    <div>
      <div className={styles.home_kanban_list}>
        <div className={styles.add_kanban}>
          <ProjectAddCard />
        </div>
        {projectList &&
          projectList?.map((project) => {
            return (
              <ProjectCard
                items={project}
                key={`projects-${project.projectId}`}
              />
            );
          })}
      </div>
    </div>
  );
};
export default ProjectList;
