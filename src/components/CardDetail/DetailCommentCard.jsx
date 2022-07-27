import React, { useState } from "react";
import styles from "./style/_DetailComment.module.scss";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  deleteCardComment,
  editCardComment,
} from "../../redux/Async/KanbanCardDetail";
import { DivTooltip } from "../Tooltip";

const DetailCommentCard = ({ items, index, userId }) => {
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
    <div className={styles.comment_wrapper}>
      <img src={items.profileImage} alt="profile_image" />
      <div className={styles.comment_content}>
        <a>{items.name}</a> <span>{items.createdAt}</span>
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
        <div className={styles.icon}>
          {userId === items.userId && (
            <>
              <DivTooltip content="수정하기">
                <Icon
                  className={styles.comment_icon}
                  icon="ant-design:edit-filled"
                  onClick={() => {
                    setEdit(true);
                  }}
                />
              </DivTooltip>

              <DivTooltip content="삭제하기">
                <Icon
                  onClick={deleteComment}
                  className={styles.comment_icon}
                  icon="ant-design:delete-outlined"
                />
              </DivTooltip>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCommentCard;
