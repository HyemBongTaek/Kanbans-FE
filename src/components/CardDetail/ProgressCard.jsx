import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./style/_CardProgressBar.module.scss";
import { useDispatch } from "react-redux";

import {
  checkCardTask,
  deleteCardTask,
} from "../../redux/Async/KanbanCardDetail";

const ProgressCard = (props) => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(props.items.check);

  let checkCount = props.checkCount;
  let setCheckCount = props.setCheckCount;

  const checkChangeHandler = (checked) => {
    if (checked.target.checked) {
      setIsChecked(!isChecked);
      setCheckCount((checkCount += 1));
    } else {
      // 체크 해제
      setIsChecked(!isChecked);
      setCheckCount((checkCount -= 1));
    }
    dispatch(
      checkCardTask({
        id: props.items.id,
        check: checked.target.checked,
      })
    );
  };

  const deleteTask = () => {
    if (isChecked) {
      setCheckCount((checkCount -= 1));
    }
    dispatch(
      deleteCardTask({
        id: props.items.id,
      })
    );
  };

  return (
    <div className={styles.progress_card}>
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => checkChangeHandler(e)}
        />
        {props.items.content}
      </div>
      <Icon
        onClick={deleteTask}
        className={styles.delete_icon}
        icon="ant-design:delete-outlined"
      />
    </div>
  );
};

export default ProgressCard;
