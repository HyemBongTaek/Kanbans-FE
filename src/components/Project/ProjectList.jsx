import React, { useEffect, useRef, useState } from "react";

import styles from "./style/_ProjectList.module.scss";
import ProjectCard from "./ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../../redux/Async/projects";

import ProjectAddCard from "./ProjectAddCard";
import { useParams } from "react-router-dom";
import SearchInput from "../common/SearchInput";
import JoinProjectModal from "./JoinProjectModal";

const ProjectList = ({ isjoin, setIsJoin }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);
  const projectList = useSelector((state) => state.projectsSlice.projects);

  const [isSearch, setIsSearch] = useState("");

  return (
    <>
      {isjoin && <JoinProjectModal isjoin={isjoin} setIsJoin={setIsJoin} />}
      <div className={styles.kanban_list}>
        <div className={styles.search_bar}>
          <SearchInput isSearch={isSearch} setIsSearch={setIsSearch} />
        </div>
        <div className={styles.home_kanban_list}>
          <div className={styles.add_kanban}>
            <ProjectAddCard />
          </div>
          {isSearch ? (
            <>
              {projectList
                .filter((el) => {
                  if (isSearch === "") {
                    return el;
                  } else if (
                    el.title.toLowerCase().includes(isSearch.toLowerCase())
                  ) {
                    return el;
                  }
                })
                .map((project) => {
                  return (
                    <ProjectCard
                      items={project}
                      key={`projects-${project.projectId}`}
                    />
                  );
                })}
            </>
          ) : (
            <>
              {projectList &&
                projectList?.map((project) => {
                  return (
                    <ProjectCard
                      items={project}
                      key={`projects-${project.projectId}`}
                    />
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default ProjectList;
