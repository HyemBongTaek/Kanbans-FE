import React, { useEffect, useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import Test from "../../../../static/image/test.png";

const CardDetailImage = () => {
  const [image, setImage] = useState(null);

  const ChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
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
  useEffect(() => {
    const handlePasteAnywhere = (e) => {
      const item = e.clipboardData.items[0];
      console.log(item);
    };

    window.addEventListener("paste", handlePasteAnywhere);

    return () => {
      window.removeEventListener("paste", handlePasteAnywhere);
    };
  }, []);

  const handlePaste = (e) => {
    e.preventDefault();
    const item = e.clipboardData.items[0];
    console.log(item);
  };
  console.log("이미지", image);
  return (
    <div>
      {/*onPaste={handlePaste}*/}
      <input type="file" onPaste={handlePaste} onChange={ChangeImage} />
      <div className={styles.detail_attachments}>
        <img className={styles.attachments_image} src={Test} alt="img" />
        <img className={styles.attachments_image} src={Test} alt="img" />
        <img className={styles.attachments_image} src={Test} alt="img" />
        <img className={styles.attachments_image} src={Test} alt="img" />
      </div>
      {/*style={{ display: "none" }}*/}
    </div>
  );
};

export default CardDetailImage;
