import React, { useState } from "react";
import styles from "./_KanbanCardDetail.module.scss";
import Profile from "../../../../static/image/profile.png";
import { Icon } from "@iconify/react";

const DetailCommentCard = ({ items }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles.comment_card}>
      <img src={Profile} alt="profile_image" />
      <div>
        <a>헹구</a> <span>May 5, 2022 at 5:31 PM</span>
        <form className={styles.content}>
          <label>
            {/*수정 누르지 않을경우 readOnly 사용하여 수정 불가능하게 막음*/}
            {edit ? (
              <input className={styles.edit_input} value={items.content} />
            ) : (
              <input value={items.content} readOnly />
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
            className={styles.comment_icon}
            icon="ant-design:delete-outlined"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailCommentCard;
