import React, { useEffect, useState } from "react";
import styles from "./style/_DetailComment.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { getCardComment } from "../../redux/Async/KanbanCardDetail";

import DetailCommentCard from "./DetailCommentCard";
import DetailInput from "./DetailInput";
import { useLocation } from "react-router-dom";

const DetailComments = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const cardId = location.state.cardId;

  useEffect(() => {
    dispatch(
      getCardComment({
        cardId: cardId,
      })
    );
  }, [dispatch]);

  const commentList = useSelector((state) => state.cardDetailSlice.comments);

  const [commentData, setCommentData] = useState(commentList);
  const myInfo = useSelector((state) => state.userSlice.userInfo);

  useEffect(() => {
    if (commentList) {
      setCommentData(commentList);
    } else {
      setCommentData(null);
    }
  }, [cardId, commentList]);

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
        </div>
      </div>
    </>
  );
};

export default React.memo(DetailComments);
