import React, { useEffect } from "react";
import styles from "../../components/CardDetail/style/_KanbanCardDetail.module.scss";
import CardDetailMain from "../../components/CardDetail/CardDetailMain";
import CardDetailLeft from "../../components/CardDetail/DetailLeft/CardDetailLeft";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getKanbanCardDetail } from "../../redux/Async/KanbanCardDetail";

const KanbanCardDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const cardId = location.state.cardId;
  const projectId = location.state.projectId;

  useEffect(() => {
    dispatch(
      getKanbanCardDetail({
        cardId: cardId,
      })
    );
  }, [dispatch]);

  const cardContent = useSelector((state) => state.cardDetailSlice?.card);
  const cardLabel = useSelector((state) => state.cardDetailSlice?.saveLabel);

  const closeDetailCard = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.card_detail_container}>
        <div className={styles.header} />
        <div className={styles.main}>
          <div>
            <CardDetailMain cardContent={cardContent} cardLabel={cardLabel} />
          </div>
          <div>
            <CardDetailLeft cardId={cardId} projectId={projectId} />
          </div>
        </div>
      </div>
      <div className={styles.detail_overlay} onClick={closeDetailCard} />
    </>
  );
};

export default KanbanCardDetail;
