import React, { useEffect, useState } from "react";
import DetailInput from "./DetailInput";
import styles from "./style/_KanbanCardDetail.module.scss";

import DetailCommentCard from "./DetailCommentCard";
import { useDispatch, useSelector } from "react-redux";
import { getCardComment } from "../../redux/Async/KanbanCardDetail";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";

const DetailComments = ({ cardId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCardComment({
        cardId,
      })
    );
  }, [cardId, dispatch]);

  const commentData = useSelector((state) => state.cardDetailSlice.comments);
  const myInfo = useSelector((state) => state.userSlice.userInfo);

  const [commentsList, setCommentsList] = useState(commentData);

  return (
    <>
      <div>
        <div className={styles.comment_input}>
          <img src={myInfo.profileImage} alt="profile_image" />
          <div>
            <DetailInput type="comments" cardId={cardId} />
          </div>
        </div>
        <div className={styles.comment_box}>
          {commentData &&
            commentData?.map((card, index) => {
              return (
                <DetailCommentCard
                  key={card.id}
                  items={card}
                  index={index}
                  userId={myInfo.id}
                />
              );
            })}
          {/*{commentData &&*/}
          {/*  Object.keys(commentData)?.map((key, value) => {*/}
          {/*    console.log("카아아드", { [key]: value });*/}
          {/*    // return <DetailCommentCard key={card.id} items={card} />;*/}
          {/*  })}*/}
        </div>
      </div>
    </>
  );
};

export default DetailComments;
