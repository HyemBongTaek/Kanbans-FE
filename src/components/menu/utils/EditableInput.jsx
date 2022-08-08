import React, { useContext, useEffect, useState } from "react";
import styles from "./style/_EditableInput.module.scss";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import ContextStore from "./ContextStore";
import { changeBoardTitle } from "../../../redux/Async/kanban";
import { changeBoardTitleSocket } from "../../../redux/Slice/socketSlice";
import { useDispatch } from "react-redux";
const EditableInput = ({
  boardTitle,
  editable,
  setEditable,
  boardId,
  projectId,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(boardTitle);
  // const { changeTitle } = useContext(ContextStore);

  const [isActive, setIsActive] = useState(false);

  const titleChangeHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    setIsActive(true);
  };

  const changeTitle = (e) => {
    e.preventDefault();
    dispatch(
      changeBoardTitle({
        boardId,
        title,
      })
    );
    dispatch(
      changeBoardTitleSocket({
        room: projectId,
        boardId,
        title,
      })
    );
    setEditable(false);
  };

  return (
    <>
      <form className={styles.editable} onSubmit={changeTitle}>
        <label>
          <input value={title} onChange={titleChangeHandler} />
          <div>
            {isActive && (
              <Icon
                onClick={changeTitle}
                className={classNames(styles.icons, styles.icons_check)}
                icon="akar-icons:check"
              />
            )}
            <Icon
              className={classNames(styles.icons, styles.icons_x)}
              icon="heroicons-outline:x"
              onClick={() => setEditable(!editable)}
            />
          </div>
        </label>
      </form>
    </>
  );
};

export default EditableInput;
