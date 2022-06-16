import React, { useEffect, useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import Test from "../../../../static/image/test.png";
import { changeUserInfo } from "../../../../redux/Async/user";
import { useDispatch } from "react-redux";
import { imageUpload } from "../../../../redux/Async/KanbanCardDetail";

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
  return (
    <div>
      {/*onPaste={handlePaste}*/}
      <input type="file" onChange={changeImage} multiple="multiple" />
      <div className={styles.detail_attachments}>
        <img className={styles.attachments_image} src={Test} alt="img" />
        {/*<img className={styles.attachments_image} src={Test} alt="img" />*/}
        {/*<img className={styles.attachments_image} src={Test} alt="img" />*/}
        {/*<img className={styles.attachments_image} src={Test} alt="img" />*/}
      </div>
      {/*style={{ display: "none" }}*/}
    </div>
  );
};

export default CardDetailImage;
