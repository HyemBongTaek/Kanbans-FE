import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";

import styles from "../../../style/menu/_Project.module.scss";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { addProject, getProject } from "../../../redux/Async/projects";
import SwitchButton from "../../common/SwitchButton";

const ProjectList = () => {
  const dispatch = useDispatch();
  const createRef = useRef();
  const [create, setCreate] = useDetectOutsideClick(createRef, false);
  const [addTitle, setAddTitle] = useState();
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    dispatch(getProject());
  }, [dispatch]);

  const projectList = useSelector((state) => state.ProjectsSlice.projects);
  console.log("디스패치", projectList);

  const titleHandler = (e) => {
    setAddTitle(e.target.value);
  };

  //프로젝트 만들기.
  const createProject = () => {
    const permission = isOn ? "private" : "public";
    console.log("퍼미션", permission, addTitle);

    dispatch(
      addProject({
        title: addTitle,
        permission: permission,
      })
    );
    setCreate(false);
  };

  return (
    <div>
      <ProjectHeader />
      <div className={styles.home_kanban_list}>
        <div className={styles.add_kanban}>
          {create ? (
            <div>
              <form>
                <label>
                  <input
                    placeholder="title"
                    value={addTitle}
                    onChange={titleHandler}
                  />
                </label>
              </form>
              <div>{isOn ? "프라이빗" : "퍼블릭"}</div>
              <SwitchButton isOn={isOn} onClick={() => setIsOn(!isOn)} />
              <button onClick={createProject}>만들기</button>
            </div>
          ) : (
            <div
              className={styles.add_kanban_style}
              onClick={() => setCreate(!create)}
              ref={createRef}
            >
              <div>새로만들기</div>
              <Icon icon="bi:plus-square-fill" color="black" height="40" />
            </div>
          )}
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
