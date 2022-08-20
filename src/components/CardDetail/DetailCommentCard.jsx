import React, { useState } from "react";
import styles from "./style/_DetailComment.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  deleteCardComment,
  editCardComment,
} from "../../redux/Async/KanbanCardDetail";
import Tooltip from "../Tooltip";
import TextareaAutosize from "react-textarea-autosize";

const DetailCommentCard = ({ items, index, userId }) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(items.content);
  const [isActive, setIsActive] = useState(false);

  const deleteComment = () => {
    dispatch(
      deleteCardComment({
        id: items.id,
      })
    );
  };
  const editChangeHandler = (e) => {
    setContent(e.target.value);
    setIsActive(true);
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
    <div className={styles.comment_wrapper}>
      <img src={items.profileImage} alt="profile_image" />
      <div className={styles.comment_content}>
        <div className={styles.title}>
          <a>{items.name}</a> <span>{items.createdAt}</span>
        </div>
        <form className={styles.content} onSubmit={editCardClick}>
          {/*수정 누르지 않을경우 readOnly 사용하여 수정 불가능하게 막음*/}
          {edit ? (
            <>
              <label className={styles.edit_label}>
                <TextareaAutosize
                  className={styles.edit_input}
                  value={content}
                  onChange={editChangeHandler}
                />
                {isActive && (
                  <Icon
                    className={styles.check_icon}
                    icon="bi:check-lg"
                    onClick={editCardClick}
                  />
                )}
              </label>
            </>
          ) : (
            <TextareaAutosize
              className={styles.edit_input}
              value={content}
              readOnly
            />
          )}
        </form>
        <div className={styles.icon}>
          {userId === items.userId && !edit && (
            <>
              <Tooltip content="수정하기">
                <Icon
                  className={styles.comment_icon}
                  icon="ant-design:edit-filled"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
              </Tooltip>

              <Tooltip content="삭제하기">
                <Icon
                  onClick={deleteComment}
                  className={styles.comment_icon}
                  icon="ant-design:delete-outlined"
                />
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCommentCard;
