import React, { useEffect, useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageDelete,
  imageUpload,
} from "../../../../redux/Async/KanbanCardDetail";

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

  console.log("이미지리스트", imageLists);
  // useEffect(() => {
  //   const handlePasteAnywhere = (e) => {
  //     console.log(e.clipboardData.getData("file"));
  //   };
  //
  //   window.addEventListener("paste", handlePasteAnywhere);
  //
  //   return () => {
  //     window.removeEventListener("paste", handlePasteAnywhere);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handlePasteAnywhere = (e) => {
  //     const item = e.clipboardData.items[0];
  //     console.log(item);
  //   };
  //
  //   window.addEventListener("paste", handlePasteAnywhere);
  //
  //   return () => {
  //     window.removeEventListener("paste", handlePasteAnywhere);
  //   };
  // }, []);

  // const handlePaste = (e) => {
  //   e.preventDefault();
  //   const item = e.clipboardData.items[0];
  //   console.log(item);
  // };

  const deleteClick = (el) => {
    dispatch(
      ImageDelete({
        imageId: el.id,
        cardId,
      })
    );
  };
  return (
    <div>
      {/*onPaste={handlePaste}*/}
      <input type="file" onChange={changeImage} multiple="multiple" />
      {imageLists && (
        <div className={styles.detail_attachments}>
          {imageLists?.map((el) => {
            return (
              <div key={el.id}>
                <img
                  key={el.index}
                  className={styles.attachments_image}
                  src={el.url}
                  alt="img"
                />
                <div onClick={() => deleteClick(el)}>삭제</div>
              </div>
            );
          })}
        </div>
      )}

      {/*<img className={styles.attachments_image} src={Test} alt="img" />*/}
      {/*<img className={styles.attachments_image} src={Test} alt="img" />*/}
      {/*<img className={styles.attachments_image} src={Test} alt="img" />*/}

      {/*style={{ display: "none" }}*/}
    </div>
  );
};

export default CardDetailImage;
