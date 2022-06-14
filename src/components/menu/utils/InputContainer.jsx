import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./style/_InputContainer.module.scss";
import { useDispatch } from "react-redux";
import { addKanbanBoard } from "../../../redux/Async/kanban";
import { addKanbanCard } from "../../../redux/Async/kanban";
import { Icon } from "@iconify/react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";

const InputContainer = ({ type, boardId, projectId }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const addCards = () => {
    if (boardId === undefined) {
      return;
    } else {
      dispatch(addKanbanCard({ title, boardId }));
    }
    setTitle("");
    setOpen(false);
  };

  const addsHandler = () => {
    if (type === "board") {
      dispatch(
        addKanbanBoard({
          title,
          projectId,
        })
      );
      setOpen(false);
      setTitle("");
    }
  };

  const cancleClick = () => {
    setOpen(false);
    setTitle("");
  };

  //외부클릭 감지
  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <>
      <div>
        {!open && (
          <div className={styles.add_button} onClick={() => setOpen(true)}>
            {type === "board" ? "+ Add a Board" : " + Add a Card"}
          </div>
        )}
        {open && type === "board" && (
          <form
            className={styles.add_form}
            onSubmit={addsHandler}
            ref={inputRef}
          >
            <label>
              <input value={title || ""} onChange={titleOnChange} />
              <div>
                <Icon
                  className={styles.icon_check}
                  onClick={addsHandler}
                  icon="bi:check-lg"
                />
                <Icon
                  className={styles.icon_cancle}
                  onClick={cancleClick}
                  icon="heroicons-outline:x"
                />
              </div>
            </label>
          </form>
        )}
        {open && type === "card" && (
          <form className={styles.add_form} onSubmit={addCards} ref={inputRef}>
            <label>
              <input value={title || ""} onChange={titleOnChange} />
              <div>
                <Icon
                  className={styles.icon_check}
                  onClick={addCards}
                  icon="bi:check-lg"
                />
                <Icon
                  className={styles.icon_cancle}
                  onClick={cancleClick}
                  icon="heroicons-outline:x"
                />
              </div>
            </label>
          </form>
        )}
      </div>
    </>
  );
};

export default InputContainer;
