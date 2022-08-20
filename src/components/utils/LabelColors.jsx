import React from "react";
import styles from "./style/_LabelColors.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { deleteProjectLabel } from "../../redux/Async/KanbanCardDetail";

//프로젝트 전체의 라벨 색 나타내는 컴포넌트
const LabelColors = ({ item, seletedLabel, setSelectedLabel, projectId }) => {
  const dispatch = useDispatch();
  const changeHandler = (checked, id) => {
    if (checked) {
      setSelectedLabel([...seletedLabel, id]);
    } else {
      // 체크 해제
      setSelectedLabel(seletedLabel.filter((el) => el !== id));
    }
  };

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
        <label className={styles[item.color]}>
          <input
            key={item.id}
            type="checkbox"
            id={item.id}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, item.id);
            }}
            checked={seletedLabel.includes(item.id) ? true : false}
          />
          <div className={styles.title}>{item.title}</div>
          <Icon
            className={styles.icon}
            icon="ant-design:delete-outlined"
            onClick={deleteLabel}
          />
        </label>
      </div>
    </>
  );
};

export default LabelColors;
