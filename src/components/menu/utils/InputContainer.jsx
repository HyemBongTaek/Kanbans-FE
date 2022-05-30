import React, { useContext, useState } from "react";
import styles from "./style/_InputContainer.module.scss";
import { useDispatch } from "react-redux";
import { addKanbanBoard } from "../../../redux/Async/kanbanboard";
import { addKanbanCard } from "../../../redux/Async/KanbanCard";

const InputContainer = ({ type, boardId, projectId }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  // const addBoards = () => {
  //   setTitle("");
  //   setOpen(false);
  // };
  //
  const addCards = () => {
    console.log("카드인풋", title, boardId);
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

  return (
    <>
      <div>
        {!open && (
          <div className={styles.add_input} onClick={() => setOpen(true)}>
            {type === "board" ? <div> + Add a Board </div> : " + Add a Card"}
          </div>
        )}
        {open && type === "board" && (
          <form onSubmit={addsHandler}>
            <label>
              <input value={title} onChange={titleOnChange} />
              <div onClick={() => setOpen(false)}>X</div>
            </label>
            <button type="button" onClick={addsHandler}>
              등록하기
            </button>
          </form>
        )}
        {open && type === "card" && (
          <form onSubmit={addCards}>
            <label>
              <input value={title} onChange={titleOnChange} />
              <div onClick={() => setOpen(false)}>X</div>
            </label>
            <button type="button" onClick={addCards}>
              등록하기
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default InputContainer;
