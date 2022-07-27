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
      {/*등록된 라벨 표시*/}
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

        {/*타이틀*/}
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
          <Icon
            onClick={editTitle}
            className={titleActive ? styles.active_btn : styles.unActive_btn}
            icon="bi:check-lg"
          />
        </form>

        {/*서브타이틀*/}
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
          </label>
          <Icon
            className={subTitleActive ? styles.active_btn : styles.unActive_btn}
            onClick={editSubTitle}
            icon="bi:check-lg"
          />
        </form>

        {/*설명칸*/}
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
          </label>
          <Icon
            onClick={editDescription}
            className={
              descriptionActive ? styles.active_btn : styles.unActive_btn
            }
            icon="bi:check-lg"
          />
        </form>

        {/*사진넣기*/}
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Attachments
        </div>
        <CardDetailImage cardId={cardContent.id} />

        {/*진행목록 진행바*/}
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Tasks
        </div>
        <CardProgressBar cardId={cardContent.id} />

        {/*코멘트*/}
        <div className={styles.title}>
          <Icon
            className={styles.title_icon}
            icon="fluent:app-title-20-filled"
          />
          Comments
        </div>
        <DetailComments />
      </div>
    </>
  );
};

export default CardDetailMain;
