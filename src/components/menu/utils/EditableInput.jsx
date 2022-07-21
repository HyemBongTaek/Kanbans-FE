import React, { useContext, useEffect, useState } from "react";
import styles from "./style/_EditableInput.module.scss";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import ContextStore from "./ContextStore";
import { socket } from "../../../redux/store";

const EditableInput = ({
  boardTitle,
  editable,
  setEditable,
  boardId,
  projectId,
}) => {
  const [title, setTitle] = useState(boardTitle);
  const { changeTitle } = useContext(ContextStore);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  // useEffect(() => {
  //   socket.emit("join", projectId);
  // }, [projectId]);

  return (
    <>
      <form className={styles.editable}>
        <label>
          <input value={title} onChange={titleChangeHandler} />
          <div>
            <Icon
              className={classNames(styles.icons, styles.icons_x)}
              icon="heroicons-outline:x"
              onClick={() => setEditable(!editable)}
            />
            <Icon
              onClick={() =>
                changeTitle({
                  title,
                  boardId,
                  setEditable,
                  editable,
                  projectId,
                })
              }
              className={classNames(styles.icons, styles.icons_check)}
              icon="akar-icons:check"
            />
          </div>
        </label>
      </form>
    </>
  );
};

export default EditableInput;
