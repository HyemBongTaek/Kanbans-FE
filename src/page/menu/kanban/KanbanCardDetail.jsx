import React, { useEffect } from "react";

import styles from "../../../components/menu/kanban/CardDetail/_KanbanCardDetail.module.scss";
import CardDetailMain from "../../../components/menu/kanban/CardDetail/CardDetailMain";
import CardDetailLeft from "../../../components/menu/kanban/CardDetail/CardDetailLeft";
import { useDispatch, useSelector } from "react-redux";
import { cardOpenReducer } from "../../../redux/Slice/kanbanSlice";
import { useNavigate, useParams } from "react-router-dom";

const KanbanCardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);

  // useEffect();
  // const cardId = useSelector((state) => state.kanbanslice?.cardId);
  // console.log("카드아이디", cardId);

  const closeDetailCard = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={styles.card_detail_container}>
        <div className={styles.header} />
        <div className={styles.main}>
          <div>
            <CardDetailMain cardId={params.cardId} />
          </div>
          <div>
            <CardDetailLeft />
          </div>
        </div>
      </div>
      <div className={styles.detail_overlay} onClick={closeDetailCard} />
    </>
  );
};

export default KanbanCardDetail;
