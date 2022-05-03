import { Icon } from "@iconify/react";
import React from "react";

import Profile from "../../../image/profile.png";
import styles from "../../../style/menu/_KanbanBoard.module.scss";

const KanbanCard = () => (
  <div className={styles.kanban_card}>
    <div className={styles.kanban_status} />
    <div className={styles.card_contents}>
      <div className={styles.card_top}>
        <div className={styles.labels}>
          <div className={styles.label}>라벨</div>
          <div className={styles.label}>라벨</div>
          <div className={styles.label}>라벨</div>
        </div>
        <Icon icon="akar-icons:check-box" color="#545454" height="30" />
        {/* <Icon icon="akar-icons:check-box-fill" color="#545454" height="30" /> */}
      </div>
      <div className={styles.card_title}>title</div>
      <div className={styles.card_mid}>
        <img src={Profile} alt="profile_img" />
        <img src={Profile} alt="profile_img" />
        <img src={Profile} alt="profile_img" />
        <img src={Profile} alt="profile_img" />
      </div>
      <div className={styles.card_bottom}>
        <div className={styles.date}>
          &nbsp;
          <Icon className={styles.bottom_icon} icon="uit:calender" />
          &nbsp;28 April &nbsp;
        </div>
        <div className={styles.date}>
          <Icon className={styles.bottom_icon} icon="bi:clock" />
          &nbsp;D-3&nbsp;
        </div>
        <div className={styles.task}>
          <Icon
            className={styles.bottom_icon}
            icon="fluent:task-list-ltr-20-regular"
          />
          &nbsp;2/4&nbsp;
        </div>
        <div className={styles.task}>
          <Icon className={styles.bottom_icon} icon="ei:comment" />
          &nbsp;2&nbsp;
        </div>
      </div>
    </div>
  </div>
);

export default KanbanCard;
