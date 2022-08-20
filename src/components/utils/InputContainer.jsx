import React, { useEffect, useRef, useState } from "react";
import styles from "./style/_InputContainer.module.scss";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import { socket } from "../../redux/store";
import { boardAddSocket, cardAddSocket } from "../../redux/Slice/socketSlice";
import Apis from "../../redux/apis";
import {
  createBoardReducer,
  createCardReducer,
} from "../../redux/Slice/kanbanSlice";

const InputContainer = ({ type, boardId, projectId }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    socket.emit("join", projectId);
  }, [projectId]);

  const titleOnChange = (e) => {
    setIsActive(true);
    setTitle(e.target.value);
  };

  const addCards = () => {
    Apis.post(`/board/${boardId}/card`, {
      title,
      boardId,
    }).then((res) =>
      dispatch(
        createCardReducer({ boardId, data: res.data.newCard }),
        dispatch(cardAddSocket({ boardId, data: res.data.newCard, projectId }))
      )
    );
    setTitle("");
    setIsActive(false);
    setOpen(false);
  };

  const addsHandler = (e) => {
    e.preventDefault();
    Apis.post("/board", {
      title,
      projectId,
    }).then((res) =>
      dispatch(
        createBoardReducer(res.data.newBoard),
        dispatch(boardAddSocket(res.data.newBoard))
      )
    );
    setTitle("");
    setOpen(false);
  };

  const cancleClick = () => {
    setOpen(false);
    setTitle("");
    inputRef.current.focus();
  };

  // 외부클릭 감지
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
              <input value={title || ""} onChange={titleOnChange} autoFocus />
              <div className={styles.icons}>
                {isActive && (
                  <Icon
                    className={styles.icon_check}
                    onClick={addsHandler}
                    icon="bi:check-lg"
                  />
                )}

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
              <input
                className={styles.input}
                value={title || ""}
                onChange={titleOnChange}
                autoFocus
              />
              <div className={styles.icons}>
                {isActive && (
                  <Icon
                    className={styles.icon_check}
                    onClick={addCards}
                    icon="bi:check-lg"
                  />
                )}

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

export default React.memo(InputContainer);
