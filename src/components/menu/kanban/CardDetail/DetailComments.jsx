import React, { useEffect } from "react";
import Profile from "../../../../static/image/profile.png";
import DetailInput from "./DetailInput";
import styles from "./_KanbanCardDetail.module.scss";
import { Icon } from "@iconify/react";
import DetailCommentCard from "./DetailCommentCard";
import { useDispatch, useSelector } from "react-redux";
import { getCardComment } from "../../../../redux/Async/KanbanCardDetail";

const DetailComments = ({ cardId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCardComment({
        cardId,
      })
    );
  }, [dispatch]);

  const commentData = useSelector((state) => state.cardDetailSlice.comments);
  console.log("데이터", commentData);
  return (
    <>
      <div>
        <div className={styles.comment_input}>
          <img src={Profile} alt="profile_image" />
          <div>
            <DetailInput type="comments" cardId={cardId} />
          </div>
        </div>
        <div className={styles.comment_box}>
          {commentData &&
            commentData?.map((card) => {
              return <DetailCommentCard key={card.id} items={card} />;
            })}
        </div>
      </div>
    </>
  );
};

export default DetailComments;
