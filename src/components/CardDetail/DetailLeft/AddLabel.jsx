import React, { useRef, useState } from "react";
import styles from "./style/_AddLabel.module.scss";
import { useDispatch } from "react-redux";
import { addProjectLabel } from "../../../redux/Async/KanbanCardDetail";

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

  const addLabelClick = (e) => {
    e.preventDefault();
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
        <div className={styles.label_title}>
          <div>라벨등록하기</div>
        </div>
        <form className={styles.label_colors} onSubmit={addLabelClick}>
          <label>
            <div className={styles.label}>
              <div className={styles.label_color}>
                <input
                  type="radio"
                  value="red"
                  name={"check"}
                  checked={selectData.check}
                  onChange={handleChange}
                />
                <div className={styles.label_red} />
              </div>
              <div className={styles.label_color}>
                <input
                  type="radio"
                  value="pink"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_pink} />
              </div>
              <div className={styles.label_color}>
                <input
                  type="radio"
                  value="orange"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_orange} />
              </div>
              <div className={styles.label_color}>
                <input
                  type="radio"
                  value="yellow"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_yellow} />
              </div>
              <div className={styles.label_color}>
                <input
                  type="radio"
                  value="emerald_green"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_emerald_green} />
              </div>
              <div className={styles.label_color}>
                <input
                  type="radio"
                  value="green"
                  name={"check"}
                  onChange={handleChange}
                  checked={selectData.check}
                />
                <div className={styles.label_green} />
              </div>
            </div>
          </label>
        </form>
        <div className={styles.label_bottom}>
          <div>라벨은 한글5글자 영어 10글자 이내로 적어주세요</div>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="button" onClick={addLabelClick}>
            라벨 추가하기
          </button>
        </div>
      </div>

      <div className={styles.label_overlay} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default AddLabel;
