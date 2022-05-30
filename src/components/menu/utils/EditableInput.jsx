import React, { useContext, useState } from "react";
import styles from "./style/_EditableInput.module.scss";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { changeBoardTitle } from "../../../redux/Async/kanbanboard";
import ContextStore from "../../contextStore";

const EditableInput = ({ boardTitle, editable, setEditable, boardId }) => {
  const [title, setTitle] = useState(boardTitle);
  const { changeTitle } = useContext(ContextStore);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

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
                changeTitle({ title, boardId, setEditable, editable })
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
