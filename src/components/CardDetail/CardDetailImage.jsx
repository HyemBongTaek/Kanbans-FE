import React, { useEffect, useState } from "react";
import styles from "./style/_CardDetailImage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ImageDelete, imageUpload } from "../../redux/Async/KanbanCardDetail";
import CardDetailImageCard from "./CardDetailImageCard";
import { useLocation } from "react-router-dom";

const CardDetailImage = ({ cardId }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const projectId = location.state.projectId;

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
          projectId,
        })
      );
    }
  }, [image]);

  const imageLists = useSelector((state) => state.cardDetailSlice.images);

  return (
    <div className={styles.detail_image}>
      <div className={styles.input_upload}>
        <label htmlFor="image_file">이미지 업로드</label>
        <input
          type="file"
          id="image_file"
          onChange={changeImage}
          multiple="multiple"
        />
      </div>

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
