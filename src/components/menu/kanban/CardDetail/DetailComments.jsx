import React from "react";
import Profile from "../../../../static/image/profile.png";
import DetailInput from "./DetailInput";
import styles from "./_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import DetailCommentCard from "./DetailCommentCard";

const DetailComments = () => {
  return (
    <>
      <div>
        <div className={styles.comment_input}>
          <img src={Profile} alt="profile_image" />
          <div>
            <DetailInput type="comments" />
          </div>
        </div>
        <div>
          <DetailCommentCard />
          <DetailCommentCard />
          <DetailCommentCard />
          <DetailCommentCard />
        </div>
      </div>
    </>
  );
};

export default DetailComments;
