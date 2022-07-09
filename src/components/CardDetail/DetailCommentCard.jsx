import React, { useState } from "react";
import styles from "./style/_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  deleteCardComment,
  editCardComment,
} from "../../redux/Async/KanbanCardDetail";

const DetailCommentCard = ({ items, index }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(items.content);

  const deleteComment = () => {
    dispatch(
      deleteCardComment({
        id: items.id,
      })
    );
  };
  const editChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const editCardClick = (e) => {
    e.preventDefault();
    dispatch(
      editCardComment({
        id: items.id,
        content,
        index,
      })
    );
    setEdit(false);
  };

  return (
    <div className={styles.comment_card}>
      <img src={items.profileImage} alt="profile_image" />
      <div>
        <a>{items.name}</a> <span>May 5, 2022 at 5:31 PM</span>
        <form className={styles.content} onSubmit={editCardClick}>
          <label>
            {/*수정 누르지 않을경우 readOnly 사용하여 수정 불가능하게 막음*/}
            {edit ? (
              <input
                className={styles.edit_input}
                value={content}
                onChange={editChangeHandler}
              />
            ) : (
              <input value={content} readOnly />
            )}
          </label>
        </form>
        <div>
          <Icon
            className={styles.comment_icon}
            icon="ant-design:smile-outlined"
          />
          <Icon
            className={styles.comment_icon}
            icon="ant-design:edit-filled"
            onClick={() => {
              setEdit(true);
            }}
          />
          <Icon
            onClick={deleteComment}
            className={styles.comment_icon}
            icon="ant-design:delete-outlined"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCommentCard;
