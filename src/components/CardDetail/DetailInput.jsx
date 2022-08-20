import React, { useContext, useRef, useState } from "react";
import styles from "./style/_DetailInput.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import {
  addCardComment,
  addCardTask,
} from "../../redux/Async/KanbanCardDetail";

const DetailInput = ({ type, cardId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({
    progress: "",
    comments: "",
  });

  const { progress, comments } = content;

  const contentOnChange = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (type === "progress") {
      setIsOpen(false);
      dispatch(
        addCardTask({
          cardId,
          content: progress,
          checked: false,
        })
      );
    }
    if (type === "comments") {
      dispatch(
        addCardComment({
          cardId,
          content: comments,
        })
      );
    }
    setContent({
      progress: "",
      comments: "",
    });
  };

  const progressCancle = () => {
    setIsOpen(false);
    setContent({
      progress: "",
    });
  };

  return (
    <>
      <div className={styles.detail_input}>
        {/*progress바 부분 인풋*/}
        {!isOpen && (
          <div className={styles.task_button}>
            {type === "progress" && (
              <button onClick={() => setIsOpen(!isOpen)}>+ Add Task </button>
            )}
          </div>
        )}
        {isOpen && type === "progress" && (
          <form className={styles.progress_form} onSubmit={addTask}>
            <label className={styles.progress_label}>
              <input
                name="progress"
                type="progress"
                onChange={contentOnChange}
                value={progress || ""}
              />
              <Icon
                className={styles.icon}
                icon="bi:check-lg"
                onClick={addTask}
              />
              <Icon
                className={styles.icon}
                icon="heroicons-outline:x"
                onClick={progressCancle}
              />
            </label>
          </form>
        )}
        {type === "comments" && (
          <form className={styles.comments} onSubmit={addTask}>
            <label>
              <input
                className={styles.comments_input}
                type="text"
                name="comments"
                onChange={contentOnChange}
                value={comments || ""}
              />
              <Icon
                className={styles.icon}
                icon="bi:check-lg"
                onClick={addTask}
              />
            </label>
          </form>
        )}
      </div>
    </>
  );
};

export default DetailInput;
