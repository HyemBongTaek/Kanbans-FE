import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import profile from "../../../image/profile.png";
import styles from "../../../style/menu/_Project.module.scss";

const ProjectCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.home_card}
      // onClick={() => {
      //   navigate(`/card`, { state: list });
      // }}
    >
      <div className={styles.board_status}>
        <div className={styles.public_private}>public</div>
        {/* <Icon className={styles.board_unfavorite} icon="bi:bookmark-star" /> */}
        <Icon className={styles.board_favorite} icon="bi:bookmark-star-fill" />
      </div>
      {/* <div>private</div> */}
      <div className={styles.title}>Title</div>
      <div className={styles.home_profile}>
        <div className={styles.profile_image}>
          <div className={styles.profile_name}>헹구</div>
          <img src={profile} alt="profile_image" />
        </div>
        <div className={styles.profile_image}>
          <div className={styles.profile_name}>헹구</div>
          <img src={profile} alt="profile_image" />
        </div>
        <div className={styles.profile_image}>
          <div className={styles.profile_name}>헹구</div>
          <img src={profile} alt="profile_image" />
        </div>
        <div className={styles.profile_image}>
          <Icon icon="ph:dots-three-circle-light" color="#545454" height="58" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
