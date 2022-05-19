import React, { useRef, useState } from "react";
import SwitchButton from "../../common/SwitchButton";
import styles from "./_AddProjectCard.module.scss";
import { Icon } from "@iconify/react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";
import { addProject } from "../../../redux/Async/projects";
import { useDispatch } from "react-redux";

const AddProjectCard = () => {
  const dispatch = useDispatch();
  const createRef = useRef();
  const [create, setCreate] = useDetectOutsideClick(createRef, false);
  const [addTitle, setAddTitle] = useState();
  const [isOn, setIsOn] = useState(false);
  const titleHandler = (e) => {
    setAddTitle(e.target.value);
  };

  //프로젝트 만들기.
  const createProject = () => {
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
    <div>
      {create ? (
        <div className={styles.add_project}>
          <form>
            <label>
              <Icon className={styles.icon} icon="fluent:app-title-24-filled" />
              <input
                placeholder="title"
                value={addTitle}
                onChange={titleHandler}
              />
            </label>
          </form>
          <div>
            <div className={styles.permission}>
              <div>
                {isOn ? (
                  <Icon
                    className={styles.icon}
                    icon="heroicons-solid:lock-closed"
                  />
                ) : (
                  <Icon
                    className={styles.icon}
                    icon="heroicons-solid:lock-open"
                  />
                )}
              </div>
              <SwitchButton isOn={isOn} onClick={() => setIsOn(!isOn)} />
            </div>
          </div>
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
  );
};

export default AddProjectCard;
