import { Icon } from "@iconify/react";
import React, { useState } from "react";

import styles from "../../../../style/menu/_KanbanCardDetail.module.scss";

const KanBanCardDetail = ({ setIsDetail }) => {
  // const [title, setTitle] = useState("둘셋");
  // const [subTitle, setSubTitle] = useState("서브타이틀");

  const [inputs, setInputs] = useState({
    title: "하나둘",
    subTitle: "셋넷",
    description: "오늘은",
  });
  const { title, subTitle, description } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <div className={styles.card_detail_container}>
      <div className={styles.card_detail_main}>
        <div>
          <div className={styles.detail_title}>
            <Icon
              icon="fluent:app-title-20-filled"
              color="#545454"
              height="30"
            />
            Title
          </div>
          <form className={styles.title_form}>
            <input name="title" defaultValue={title} onChange={onChange} />
          </form>
        </div>
        <div>
          <div className={styles.detail_title}>
            <Icon
              icon="fluent:app-title-20-filled"
              color="#545454"
              height="30"
            />
            subTitle
          </div>
          <form className={styles.title_form}>
            <input name="subTitle" defaultValue={subTitle} />
          </form>
        </div>
        <div>
          <div className={styles.detail_title}>
            <Icon
              icon="fluent:app-title-20-filled"
              color="#545454"
              height="30"
            />
            description
          </div>
          <form className={styles.title_form}>
            <textarea name="description" defaultValue={description} />
          </form>
        </div>
        <div>
          <div className={styles.detail_title}>
            <Icon
              icon="fluent:app-title-20-filled"
              color="#545454"
              height="30"
            />
            Attachments
            <input type="file" />
          </div>
        </div>
      </div>
      <div className={styles.card_detail_sub}>호호</div>
    </div>
  );
};

export default KanBanCardDetail;
