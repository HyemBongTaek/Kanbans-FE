import React, { useState } from "react";
import styles from "./style/_CardDetailImage.module.scss";
import { ImageDelete } from "../../redux/Async/KanbanCardDetail";
import { useDispatch } from "react-redux";

const CardDetailImageCard = ({ items, cardId }) => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);
  const deleteClick = () => {
    dispatch(
      ImageDelete({
        imageId: items.id,
        cardId,
      })
    );
  };
  return (
    <>
      {isModal && (
        <>
          <div className={styles.attachments_modal}>
            <img src={items.url} alt="img" />
          </div>
          <div
            className={styles.layout}
            onClick={() => setIsModal((pre) => !pre)}
          />
        </>
      )}
      <div onClick={() => setIsModal((pre) => !pre)}>
        <img className={styles.attachments_image} src={items.url} alt="img" />
        <div onClick={deleteClick}>삭제</div>
      </div>
    </>
  );
};

export default CardDetailImageCard;
