import React, { useEffect, useState } from "react";
import styles from "./style/_CardDetailImage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ImageDelete, imageUpload } from "../../redux/Async/KanbanCardDetail";
import CardDetailImageCard from "./CardDetailImageCard";

const CardDetailImage = ({ cardId }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const changeImage = (e) => {
    e.preventDefault();
    setImage(e.target.files);
  };

  useEffect(() => {
    if (image !== null) {
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("images", image[i]);
      }
      dispatch(
        imageUpload({
          formData,
          cardId,
        })
      );
    }
  }, [image]);

  const imageLists = useSelector((state) => state.cardDetailSlice.images);

  return (
    <div>
      <input type="file" onChange={changeImage} multiple="multiple" />
      {imageLists && (
        <div className={styles.detail_attachments}>
          {imageLists?.map((el) => {
            return (
              <CardDetailImageCard items={el} key={el.id} cardId={cardId} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardDetailImage;
