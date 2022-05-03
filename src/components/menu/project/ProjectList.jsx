import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import styles from "../../../style/menu/_Project.module.scss";
import ProjectCard from "./ProjectCard";
import ProjectHeader from "./ProjectHeader";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    //여기서는 async await 을 쓸 수 없다.
    fetch("http://localhost:3000/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setList(data);
      });
  }, []);

  console.log(list);
  return (
    <div>
      <ProjectHeader />
      <div className={styles.home_kanban_list}>
        {list?.lists.map((list) => (
          <ProjectCard list={list} />
        ))}

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
