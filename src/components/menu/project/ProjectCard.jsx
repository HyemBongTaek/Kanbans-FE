import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import profile from "../../../image/profile.png";
import styles from "../../../style/menu/_Project.module.scss";

const ProjectCard = (props) => {
  console.log("프로젝트", props);
  const { items } = props;
  const navigate = useNavigate();
  const [projectBookmark, setProjectBookmark] = useState(items.bookmark);
  console.log("북마크", projectBookmark);
  const clickBookmarkHandler = () => {
    setProjectBookmark(!projectBookmark);
  };

  return (
    <div className={styles.home_card}>
      <div className={styles.board_status}>
        <div className={styles.public_private}>{items.permission}</div>
        {projectBookmark ? (
          <Icon
            onClick={clickBookmarkHandler}
            className={styles.board_favorite}
            icon="bi:bookmark-star-fill"
          />
        ) : (
          <Icon
            onClick={clickBookmarkHandler}
            className={styles.board_unfavorite}
            icon="bi:bookmark-star"
          />
        )}
      </div>
      {/* <div>private</div> */}
      <div
        onClick={() => {
          navigate(`/card`);
        }}
      >
        <div className={styles.title}>{items.title}</div>
        <div className={styles.home_profile}>
          {items &&
            items.users?.map((profile) => {
              return (
                <div className={styles.profile_image} key={profile.userId}>
                  {/*<div className={styles.profile_name}>{profile.name}</div>*/}
                  <img src={profile.profileImageURL} alt="profile_image" />
                </div>
              );
            })}

          {/*<div className={styles.profile_image}>*/}
          {/*  <div className={styles.profile_name}>헹구</div>*/}
          {/*  <img src={profile} alt="profile_image" />*/}
          {/*</div>*/}
          {/*<div className={styles.profile_image}>*/}
          {/*  <div className={styles.profile_name}>헹구</div>*/}
          {/*  <img src={profile} alt="profile_image" />*/}
          {/*</div>*/}
          <div className={styles.profile_image}>
            <Icon
              icon="ph:dots-three-circle-light"
              color="#545454"
              height="58"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
