import React, { useContext, useState } from "react";
import store from "../store";
import styles from "../../../../style/menu/utils/_InputContainer.module.scss";

const InputContainer = ({ type, boardId }) => {
  console.log("칸반보드아이디", boardId);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { addBoardHandler, addCardHandler } = useContext(store);

  const titleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const addBoards = () => {
    addBoardHandler(title);
    setTitle("");
    setOpen(false);
  };

  const addCards = () => {
    if (boardId === undefined) {
      return;
    } else {
      addCardHandler(title, boardId);
      setTitle("");
      setOpen(false);
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
          <form onSubmit={addBoards}>
            <label>
              <input value={title} onChange={titleOnChange} />
              <div onClick={() => setOpen(false)}>X</div>
            </label>
            <button type="button" onClick={addBoards}>
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
