import React, { useCallback, useEffect, useState } from "react";
import styles from "./style/_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import CardProgressBar from "./CardProgressBar";
import DetailComments from "./DetailComments";
import { useDispatch } from "react-redux";
import { editContent } from "../../redux/Async/KanbanCardDetail";
import CardDetailImage from "./CardDetailImage";
import GetLabels from "./GetLabels";

const CardDetailMain = ({ cardContent, cardLabel }) => {
  //input 한번에 관리.
  const dispatch = useDispatch();

  const [title, setTitle] = useState(cardContent.title);
  const [subTitle, setSubTitle] = useState(cardContent.subtitle);
  const [description, setDescription] = useState(cardContent.description);

  useEffect(() => {
    setTitle(cardContent.title);
    setSubTitle(cardContent.subtitle ? cardContent.subtitle : "");
    setDescription(cardContent.description ? cardContent.description : "");
  }, [cardContent]);

  const [titleActive, setTitleActive] = useState(false);
  const [subTitleActive, setSubTitleActive] = useState(false);
  const [descriptionActive, setDescriptionActive] = useState(false);

  const isActiveButton = ({ type }) => {
    if (type === "description") {
      return description !== ""
        ? setDescriptionActive(true)
        : setDescriptionActive(false);
    }
    if (type === "title") {
      return title !== "" ? setTitleActive(true) : setTitleActive(false);
    }
    if (type === "subTitle") {
      return subTitle !== ""
        ? setSubTitleActive(true)
        : setSubTitleActive(false);
    }
  };

  const editTitle = (e) => {
    e.preventDefault();
    dispatch(
      editContent({
        cardId: cardContent.id,
        title,
        type: "title",
      })
    );
    setTitleActive(false);
  };

  const editSubTitle = (e) => {
    e.preventDefault();
    dispatch(
      editContent({
        cardId: cardContent.id,
        subTitle,
        type: "subTitle",
      })
    );
    setSubTitleActive(false);
  };
  const editDescription = (e) => {
    e.preventDefault();
    dispatch(
      editContent({
        cardId: cardContent.id,
        description,
        type: "description",
      })
    );
    setDescriptionActive(false);
  };

  return (
    <>
      <div>
        <div className={styles.label}>
          {cardLabel &&
            cardLabel.map((label) => {
              return (
                <GetLabels
                  item={label}
                  key={label.id}
                  cardId={cardContent.id}
                />
              );
            })}
        </div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Title
        </div>
        <form className={styles.title_form} onSubmit={editTitle}>
          <label>
            <input
              onKeyUp={() => isActiveButton({ type: "title" })}
              key={cardContent.title}
              type="title"
              name="title"
              value={title || ""}
              onChange={useCallback((e) => setTitle(e.target.value))}
            />
          </label>
          <button
            className={titleActive ? styles.active_btn : styles.unActive_btn}
          >
            <Icon className={styles.icon} icon="bi:check-lg" />
          </button>
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
          <label>
            <input
              onKeyUp={() => isActiveButton({ type: "subTitle" })}
              type="subTitle"
              name="subTitle"
              value={subTitle || ""}
              onChange={useCallback((e) => setSubTitle(e.target.value))}
            />
            <button
              className={
                subTitleActive ? styles.active_btn : styles.unActive_btn
              }
              onSubmit={editSubTitle}
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
          description
        </div>
        <form className={styles.title_form} onSubmit={editDescription}>
          <label className={styles.title_textarea}>
            <textarea
              onKeyUp={() => isActiveButton({ type: "description" })}
              type="description"
              name="description"
              value={description || ""}
              onChange={useCallback((e) => setDescription(e.target.value))}
            />
            <button
              className={
                descriptionActive ? styles.active_btn : styles.unActive_btn
              }
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
          <CardDetailImage cardId={cardContent.id} />
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
          <CardProgressBar cardId={cardContent.id} />
        </div>
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Comments
        </div>
        <div>
          <DetailComments cardId={cardContent.id} />
        </div>
      </div>
    </>
  );
};

export default CardDetailMain;
