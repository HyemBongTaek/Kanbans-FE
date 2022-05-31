import React, { useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import Test from "../../../../static/image/test.png";
import CardProgressBar from "./CardProgressBar";
import DetailComments from "./DetailComments";

const CardDetailMain = ({ items }) => {
  //input 한번에 관리.
  const [inputs, setInputs] = useState({
    title: items.content,
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
    <>
      <div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Title
        </div>
        <form className={styles.title_form}>
          <input name="title" defaultValue={title} onChange={onChange} />
        </form>
      </div>
      <div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          subTitle
        </div>
        <form className={styles.title_form}>
          <input name="subTitle" defaultValue={subTitle} />
        </form>
      </div>
      <div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          description
        </div>
        <form className={styles.title_form}>
          <textarea
            className={styles.detail_textarea}
            name="description"
            defaultValue={description}
          />
        </form>
      </div>
      <div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Attachments
        </div>
        <div>
          <input type="file" />
          <div className={styles.detail_attachments}>
            <img className={styles.attachments_image} src={Test} alt="img" />
            <img className={styles.attachments_image} src={Test} alt="img" />
            <img className={styles.attachments_image} src={Test} alt="img" />
            <img className={styles.attachments_image} src={Test} alt="img" />
          </div>
        </div>
      </div>
      <div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Tasks
        </div>
        <div>
          <CardProgressBar />
        </div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Comments
        </div>
        <div>
          <DetailComments />
        </div>
      </div>
    </>
  );
};

export default CardDetailMain;
