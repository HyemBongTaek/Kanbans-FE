import React, { useEffect, useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import Test from "../../../../static/image/test.png";
import CardProgressBar from "./CardProgressBar";
import DetailComments from "./DetailComments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editContent,
  getKanbanCardDetail,
} from "../../../../redux/Async/KanbanCardDetail";
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
    subTitle: cardContent ? cardContent.subtitle : "",
    description: cardContent ? cardContent.description : "",
  });
  const { title, subTitle, description } = inputs;

  const [isActive, setIsActive] = useState(false);

  const isActiveButton = () => {
    return description !== "" ? setIsActive(true) : setIsActive(false);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const editTitle = (e) => {
    e.preventDefault();
    dispatch(
      editContent({
        cardId,
        title,
        type: "title",
      })
    );
  };

  const editSubTitle = (e) => {
    e.preventDefault();
    dispatch(
      editContent({
        cardId,
        subTitle,
        type: "subTitle",
      })
    );
  };
  const editDescription = (e) => {
    e.preventDefault();
    dispatch(
      editContent({
        cardId,
        description,
        type: "description",
      })
    );
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
        <form className={styles.title_form} onSubmit={editTitle}>
          <input
            type="title"
            name="title"
            defaultValue={title}
            onChange={onChange}
          />
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
        <form className={styles.title_form} onSubmit={editSubTitle}>
          <input
            type="subTitle"
            name="subTitle"
            defaultValue={subTitle}
            onChange={onChange}
          />
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
        <form className={styles.title_form} onSubmit={editDescription}>
          <label className={styles.title_textarea}>
            <textarea
              onKeyUp={isActiveButton}
              type="description"
              name="description"
              defaultValue={description}
              onChange={onChange}
            />
            <button
              className={isActive ? styles.active_btn : styles.unactive_btn}
              onSubmit={editDescription}
            >
              <Icon className={styles.icon} icon="bi:check-lg" />
            </button>
          </label>
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
          <CardDetailImage cardId={cardId} />
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
