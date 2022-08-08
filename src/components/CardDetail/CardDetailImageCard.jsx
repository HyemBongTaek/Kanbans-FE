import React, { useState } from "react";
import styles from "./style/_CardDetailImage.module.scss";
import { ImageDelete } from "../../redux/Async/KanbanCardDetail";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

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
      <div className={styles.image}>
        <div onClick={() => setIsModal((pre) => !pre)}>
          <img className={styles.attachments_image} src={items.url} alt="img" />
        </div>
        <Icon
          onClick={deleteClick}
          className={styles.delete_icon}
          icon="ant-design:delete-outlined"
        />
      </div>
    </>
  );
};

export default CardDetailImageCard;
