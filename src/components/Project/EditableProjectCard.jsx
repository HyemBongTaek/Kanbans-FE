import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../redux/Async/projects";
import styles from "./style/_EditableProjectCard.module.scss";

const EditableProjectCard = ({ projectId, existingTitle, setIsEditable }) => {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState(existingTitle);

  const changeProject = (e) => {
    e.preventDefault();
    const permission = isOn ? "private" : "public";
    dispatch(
      updateProject({
        title: title,
        permission: permission,
        projectId: projectId,
      })
    );
    setIsEditable(false);
    setIsActive(false);
    setTitle("");
  };

  const inputChangeHandler = (e) => {
    setTitle(e.target.value);
    setIsActive(true);
  };

  return (
    <div>
      <form className={styles.editable_card} onSubmit={changeProject}>
        <label>
          <input value={title} onChange={inputChangeHandler} />
        </label>
      </form>
      {isActive && (
        <button className={styles.add_button} onClick={changeProject}>
          등록하기
        </button>
      )}
      <button
        onClick={() => setIsEditable((pre) => !pre)}
        className={styles.finish_button}
      >
        끝내기
      </button>
      {/*<SwitchButton isOn={isOn} onClick={() => setIsOn(!isOn)} />*/}
    </div>
  );
};

export default EditableProjectCard;
