import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../../style/menu/_Project.module.scss";
import { useDispatch } from "react-redux";
import { bookmarkProject, deleteProject } from "../../../redux/Async/projects";

const ProjectCard = (props) => {
  const dispatch = useDispatch();
  const { items } = props;
  console.log("프로젝트아이디", items.projectId);

  console.log("이미지지지지지", props);
  const navigate = useNavigate();
  const [projectBookmark, setProjectBookmark] = useState(items.bookmark);

  const clickBookmarkHandler = () => {
    setProjectBookmark(!projectBookmark);
    dispatch(
      bookmarkProject({
        projectId: items.projectId,
      })
    );
  };
  const clickDeleteProject = () => {
    dispatch(
      deleteProject({
        projectId: items.projectId,
      })
    );
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
          <div className={styles.profile_image}>
            <Icon
              icon="ph:dots-three-circle-light"
              color="#545454"
              height="58"
            />
          </div>
        </div>
      </div>
      <div className={styles.delete} onClick={clickDeleteProject}>
        <Icon icon="ant-design:delete-outlined" color="#8c8c8c" height="30" />
      </div>
    </div>
  );
};

export default ProjectCard;
