import React, { useRef, useState } from "react";
import styles from "./style/_ProjectAddCard.module.scss";
import { Icon } from "@iconify/react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { addProject } from "../../redux/Async/projects";
import { useDispatch } from "react-redux";

const ProjectAddCard = () => {
  const dispatch = useDispatch();
  const createRef = useRef();
  const [create, setCreate] = useDetectOutsideClick(createRef, false);
  const [addTitle, setAddTitle] = useState();
  const [isOn, setIsOn] = useState(false);
  const titleHandler = (e) => {
    setAddTitle(e.target.value);
  };

  //프로젝트 만들기.
  const createProject = (e) => {
    e.preventDefault();
    const permission = isOn ? "private" : "public";

    dispatch(
      addProject({
        title: addTitle,
        permission: permission,
      })
    );
    setIsOn(false);
    setAddTitle("");
    setCreate(false);
  };
  return (
    <>
      <div>
        {create ? (
          <div className={styles.add_project}>
            <div>
              <div className={styles.permission}>
                <div>
                  {isOn ? (
                    <div
                      className={styles.select_permission}
                      onClick={() => setIsOn((pre) => !pre)}
                    >
                      {/*<Icon*/}
                      {/*  className={styles.icon}*/}
                      {/*  icon="heroicons-solid:lock-closed"*/}
                      {/*/>*/}
                      <span>
                        Private<title>여기?</title>
                      </span>
                    </div>
                  ) : (
                    <div
                      className={styles.select_permission}
                      onClick={() => setIsOn((pre) => !pre)}
                    >
                      {/*<Icon*/}
                      {/*  className={styles.icon}*/}
                      {/*  icon="heroicons-solid:lock-open"*/}
                      {/*/>*/}
                      <span>Public</span>
                    </div>
                  )}
                </div>
                {/*<SwitchButton isOn={isOn} onClick={() => setIsOn(!isOn)} />*/}
              </div>
            </div>
            <form onSubmit={createProject}>
              <label>
                <Icon
                  className={styles.icon}
                  icon="fluent:app-title-24-filled"
                />
                <input
                  placeholder="title"
                  value={addTitle}
                  onChange={titleHandler}
                />
              </label>
            </form>
            <div className={styles.buttons}>
              <button onClick={() => setCreate(false)}> 취소하기</button>
              <button onClick={createProject}>만들기</button>
            </div>
          </div>
        ) : (
          <div
            className={styles.add_kanban_style}
            onClick={() => setCreate((pre) => !pre)}
            ref={createRef}
          >
            <div>새로만들기</div>
            <Icon icon="bi:plus-square-fill" color="black" height="40" />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectAddCard;
