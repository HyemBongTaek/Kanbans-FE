import React, { useEffect, useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import Test from "../../../../static/image/test.png";
import CardProgressBar from "./CardProgressBar";
import DetailComments from "./DetailComments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKanbanCardDetail } from "../../../../redux/Async/KanbanCardDetail";
import CardDetailImage from "./CardDetailImage";

const CardDetailMain = ({ cardId }) => {
  //input 한번에 관리.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getKanbanCardDetail({
        cardId,
      })
    );
  }, [cardId, dispatch]);

  const cardContent = useSelector((state) => state.cardDetailSlice.card);

  console.log("카드내용", cardContent);

  const [inputs, setInputs] = useState({
    title: cardContent.title,
    subTitle: "",
    description: "",
  });
  const { title, subTitle, description } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const editContents = () => {};

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
          <CardDetailImage />
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
          <CardProgressBar cardId={cardId} />
        </div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Comments
        </div>
        <div>
          <DetailComments cardId={cardId} />
        </div>
      </div>
    </>
  );
};

export default CardDetailMain;
