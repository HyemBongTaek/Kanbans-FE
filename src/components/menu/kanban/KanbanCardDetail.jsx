import { Icon } from "@iconify/react";
import React, { useState } from "react";

import styles from "../../../style/menu/_KanbanCardDetail.module.scss";

const KanBanCardDetail = ({ setIsDetail }) => {
  const [title, setTitle] = useState("둘셋");

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.card_detail_container}>
      <div>
        <div className={styles.detail_title}>
          <Icon icon="fluent:app-title-20-filled" color="#545454" height="30" />
          Title
        </div>
        <form className={styles.title_form}>
          <input name="title" value={title} onChange={onChange} />
        </form>
      </div>
    </div>
  );
};

export default KanBanCardDetail;
