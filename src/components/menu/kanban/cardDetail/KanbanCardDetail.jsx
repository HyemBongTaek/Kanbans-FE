import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";

import Test from "../../../../image/test.png";

import styles from "./_KanbanCardDetail.module.scss";
import CardProgressBar from "./CardProgressBar";

const KanBanCardDetail = ({ setOpenDetail, items }) => {
  console.log("아이템", items);

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
      <div className={styles.card_detail_container}>
        <div className={styles.card_detail_main}>
          <div>
            <div className={styles.detail_layout}>
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
            <div className={styles.detail_layout}>
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
            <div className={styles.detail_layout}>
              <Icon
                icon="fluent:app-title-20-filled"
                color="#545454"
                height="30"
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
            <div className={styles.detail_layout}>
              <Icon
                icon="fluent:app-title-20-filled"
                color="#545454"
                height="30"
              />
              Attachments
            </div>
            <div>
              <input type="file" />
              <div className={styles.detail_attachments}>
                <img
                  className={styles.attachments_image}
                  src={Test}
                  alt="img"
                />
                <img
                  className={styles.attachments_image}
                  src={Test}
                  alt="img"
                />
                <img
                  className={styles.attachments_image}
                  src={Test}
                  alt="img"
                />
                <img
                  className={styles.attachments_image}
                  src={Test}
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.detail_layout}>
              <Icon
                icon="fluent:app-title-20-filled"
                color="#545454"
                height="30"
              />
              Tasks
            </div>
            <CardProgressBar />
          </div>
        </div>
        <div className={styles.card_detail_sub}>호호</div>
      </div>
      <div
        className={styles.detail_overlay}
        onClick={() => setOpenDetail(false)}
      />
    </>
  );
};

export default KanBanCardDetail;
