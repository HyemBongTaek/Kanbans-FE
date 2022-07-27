import React from "react";
import styles from "./style/_KanbanCardDetail.module.scss";
import { ImageDelete } from "../../redux/Async/KanbanCardDetail";
import { useDispatch } from "react-redux";

const CardDetailImageCard = ({ items, cardId }) => {
  const dispatch = useDispatch();
  const deleteClick = () => {
    dispatch(
      ImageDelete({
        imageId: items.id,
        cardId,
      })
    );
  };
  return (
    <div>
      <img className={styles.attachments_image} src={items.url} alt="img" />
      <div onClick={deleteClick}>삭제</div>
    </div>
  );
};

export default CardDetailImageCard;
