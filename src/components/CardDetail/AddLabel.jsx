import React, { useRef, useState } from "react";
import styles from "./style/_AddLabel.module.scss";
import { useDispatch } from "react-redux";
import { addProjectLabel } from "../../redux/Async/KanbanCardDetail";

//프로젝트에 라벨을 추가하는 동시에 카드에 추가함.
const AddLabel = ({ setIsOpen, projectId, cardId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  // const labelColorButton = [
  //   { color: "red" },
  //   { color: "pink" },
  //   { color: "orange" },
  //   { color: "yellow" },
  //   { color: "emerald_green" },
  //   { color: "green" },
  // ];
  //
  const [isColor, setIsColor] = useState([]);
  const [selectData, setSelectData] = useState(false);
  const handleChange = (e) => {
    const { checked, name, value } = e.target;
    setSelectData(checked);
    isColor.unshift(value);
  };

  const addLabelClick = () => {
    dispatch(
      addProjectLabel({
        projectId,
        cardId,
        content,
        color: isColor[0],
      })
    );
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.label_main}>
        <div className={styles.label_content}>
          <form className={styles.label_form}>
            <label>
              <div className={styles.label_colors}>
                <input
                  type="radio"
                  value="red"
                  name={"check"}
                  checked={selectData.check}
                  onChange={handleChange}
                />
                <div className={styles.label_red} />
              </div>
              <div className={styles.label_colors}>
                <input
                  type="radio"
                  value="pink"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_pink} />
              </div>
              <div className={styles.label_colors}>
                <input
                  type="radio"
                  value="orange"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_orange} />
              </div>
              <div className={styles.label_colors}>
                <input
                  type="radio"
                  value="yellow"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_yellow} />
              </div>
              <div className={styles.label_colors}>
                <input
                  type="radio"
                  value="emerald_green"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_emerald_green} />
              </div>
              <div className={styles.label_colors}>
                <input
                  type="radio"
                  value="green"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_green} />
              </div>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="button" onClick={addLabelClick}>
                라벨 추가하기
              </button>
            </label>
          </form>
        </div>
      </div>
      <div className={styles.label_overlay} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default AddLabel;
