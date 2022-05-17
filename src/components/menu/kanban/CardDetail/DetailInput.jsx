import React, { useContext, useRef, useState } from "react";
import styles from "./_DetailInput.module.scss";
import { Icon } from "@iconify/react";
import store from "../store";
import uuid from "react-uuid";

const DetailInput = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState({
    progress: "하나둘",
    comments: "셋넷",
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
      const newTaskId = uuid();
      addTaskHandler({
        id: newTaskId,
        content: content.progress,
      });
      setIsOpen(false);
      return;
    }
    if (type === "comments") {
      console.log("댓글", content);
    }
  };

  const { addTaskHandler } = useContext(store);
  return (
    <>
      <div className={styles.detail_input}>
        {/*progress바 부분 인풋*/}
        {!isOpen && (
          <div>
            {type === "progress" && (
              <div onClick={() => setIsOpen(!isOpen)}>+ Add Task </div>
            )}
          </div>
        )}
        {isOpen && type === "progress" && (
          <form className={styles.progress_form} onSubmit={addTask}>
            <label className={styles.progress_label}>
              <input name="progress" onChange={contentOnChange} />
              <Icon
                className={styles.icon}
                icon="bi:check-lg"
                onClick={addTask}
              />
              <Icon
                className={styles.icon}
                icon="heroicons-outline:x"
                onClick={() => setIsOpen(!isOpen)}
              />
            </label>
          </form>
        )}
        {type === "comments" && (
          <form className={styles.comments}>
            <label>
              <input type="text" name="comments" onChange={contentOnChange} />
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
