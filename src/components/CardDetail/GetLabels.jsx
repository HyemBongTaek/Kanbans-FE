import React from "react";
import styles from "./style/_GetLabels.module.scss";
import { Icon } from "@iconify/react";
import { deleteCardLabel } from "../../redux/Async/KanbanCardDetail";
import { useDispatch } from "react-redux";
import classNames from "classnames";

const GetLabels = ({ item, cardId, type }) => {
  console.log("타입", type);
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
      {type !== "main_label" ? (
        <>
          <div className={styles.wrapper}>
            <div
              className={classNames(styles[item.color], styles.detail_label)}
            >
              <div>{item.title}</div>
            </div>
            <Icon
              className={styles.delete}
              icon="akar-icons:circle-minus"
              onClick={deleteCardLabelClick}
            />
          </div>
        </>
      ) : (
        <div className={styles.main_wrapper}>
          <div className={classNames(styles[item.color], styles.main_label)} />
        </div>
      )}
    </>
  );
};

export default GetLabels;
