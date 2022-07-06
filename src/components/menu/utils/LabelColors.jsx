import React from "react";
import styles from "./style/_LabelColors.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { deleteProjectLabel } from "../../../redux/Async/KanbanCardDetail";

//프로젝트 전체의 라벨 색 나타내는 컴포넌트
const LabelColors = ({
  item,
  seletedLabel,
  setSelectedLabel,
  projectId,
  main_label,
  type,
}) => {
  const dispatch = useDispatch();
  const changeHandler = (checked, id) => {
    if (checked) {
      setSelectedLabel([...seletedLabel, id]);
    } else {
      // 체크 해제
      setSelectedLabel(seletedLabel.filter((el) => el !== id));
    }
  };
  console.log(seletedLabel);

  const deleteLabel = () => {
    dispatch(
      deleteProjectLabel({
        projectId,
        labelId: item.id,
      })
    );
  };

  return (
    <>
      <div className={styles.label_color}>
        {item && item.color === "red" && (
          <div className={styles.red}>
            <input
              key={item.id}
              type="checkbox"
              id={item.id}
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, item.id);
              }}
              checked={seletedLabel.includes(item.id) ? true : false}
            />
            <div>{item.title}</div>
          </div>
        )}
        {item && item.color === "pink" && (
          <div className={styles.pink}>
            <input
              key={item.id}
              type="checkbox"
              id={item.id}
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, item.id);
              }}
              checked={seletedLabel.includes(item.id) ? true : false}
            />
            <div>{item.title}</div>
          </div>
        )}
        {item && item.color === "orange" && (
          <div className={styles.orange}>
            <input
              key={item.id}
              type="checkbox"
              id={item.id}
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, item.id);
              }}
              checked={seletedLabel.includes(item.id) ? true : false}
            />
            <div>{item.title}</div>
          </div>
        )}
        {item && item.color === "yellow" && (
          <div className={styles.yellow}>
            <input
              key={item.id}
              type="checkbox"
              id={item.id}
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, item.id);
              }}
              checked={seletedLabel.includes(item.id) ? true : false}
            />
            <div>{item.title}</div>
          </div>
        )}
        {item && item.color === "emerald_green" && (
          <div className={styles.emerald_green}>
            <input
              key={item.id}
              type="checkbox"
              id={item.id}
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, item.id);
              }}
              checked={seletedLabel.includes(item.id) ? true : false}
            />
            <div>{item.title}</div>
          </div>
        )}
        {item && item.color === "green" && (
          <div className={styles.green}>
            <input
              key={item.id}
              type="checkbox"
              id={item.id}
              onChange={(e) => {
                changeHandler(e.currentTarget.checked, item.id);
              }}
              checked={seletedLabel.includes(item.id) ? true : false}
            />
            <div>{item.title}</div>
          </div>
        )}
        <Icon
          className={styles.icon}
          icon="ant-design:delete-outlined"
          onClick={deleteLabel}
        />
      </div>
    </>
  );
};

export default LabelColors;
