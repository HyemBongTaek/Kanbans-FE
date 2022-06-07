import React from "react";

import styles from "../../../components/menu/kanban/CardDetail/_KanbanCardDetail.module.scss";
import CardDetailMain from "../../../components/menu/kanban/CardDetail/CardDetailMain";
import CardDetailLeft from "../../../components/menu/kanban/CardDetail/CardDetailLeft";

const KanbanCardDetail = ({ setOpenDetail, items, cardId }) => {
  console.log(cardId);
  return (
    <>
      <div className={styles.card_detail_container}>
        <div className={styles.header} />
        <div className={styles.main}>
          <div>
            <CardDetailMain items={items} />
          </div>
          <div>
            <CardDetailLeft />
          </div>
        </div>
      </div>
      <div
        className={styles.detail_overlay}
        onClick={() => setOpenDetail(false)}
      />
    </>
  );
};

export default KanbanCardDetail;
