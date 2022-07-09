import React from "react";
import styles from "./style/_GetLabels.module.scss";
import { Icon } from "@iconify/react";
import { deleteCardLabel } from "../../redux/Async/KanbanCardDetail";
import { useDispatch } from "react-redux";

const GetLabels = ({ item, cardId, type }) => {
  const dispatch = useDispatch();
  const deleteCardLabelClick = () => {
    dispatch(
      deleteCardLabel({
        cardId: cardId && cardId,
        labelId: item.id,
      })
    );
  };

  return (
    <>
      <div className={type ? styles.main_wrapper : styles.wrapper}>
        {item.color === "red" && (
          <div className={styles.red}>
            <div>{item.title}</div>
          </div>
        )}
        {item.color === "pink" && (
          <div className={styles.pink}>
            <div>헹굽니당</div>
          </div>
        )}
        {item.color === "orange" && (
          <div className={styles.orange}>
            <div>헹굽니당</div>
          </div>
        )}
        {item.color === "yellow" && (
          <div className={styles.yellow}>
            <div>헹굽니당</div>
          </div>
        )}
        {item.color === "emerald_green" && (
          <div className={styles.emerald_green}>
            <div>헹굽니당</div>
          </div>
        )}
        {item.color === "green" && (
          <div className={styles.green}>
            <div>헹굽니당</div>
          </div>
        )}
        <Icon
          className={styles.delete}
          icon="akar-icons:circle-minus"
          onClick={deleteCardLabelClick}
        />
      </div>
    </>
  );
};

export default GetLabels;