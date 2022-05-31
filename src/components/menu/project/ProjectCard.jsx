import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../../../style/menu/_Project.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkProject,
  deleteProject,
  leaveProject,
} from "../../../redux/Async/projects";
import EditableProjectCard from "./EditableProjectCard";
import Swal from "sweetalert2";

const ProjectCard = (props) => {
  const dispatch = useDispatch();
  const { items } = props;

  const navigate = useNavigate();
  const [projectBookmark, setProjectBookmark] = useState(items.bookmark);
  const [isEditable, setIsEditable] = useState(false);

  const userInfo = useSelector((state) => state.userSlice.userInfo.id);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (userInfo === items.owner) {
      setIsOwner(true);
    }
  }, [userInfo, items]);

  const clickBookmarkHandler = () => {
    setProjectBookmark(!projectBookmark);
    dispatch(
      bookmarkProject({
        projectId: items.projectId,
      })
    );
  };
  const clickDeleteProject = () => {
    Swal.fire({
      title: "프로젝트를 떠나시겠습니까?",
      text: "프로젝트 초대를 받기 전까지는 다시 참가할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteProject({
            projectId: items.projectId,
          })
        );
        Swal.fire(`${items.title}을 떠났습니다.`, "", "success");
      }
    });
  };
  const editableProject = () => {
    setIsEditable(true);
  };

  const clickProject = () => {
    navigate(`/board/${items.projectId}`);
  };

  const clickLeaveProject = () => {
    Swal.fire({
      title: "프로젝트를 떠나시겠습니까?",
      text: "프로젝트 초대를 받기 전까지는 다시 참가할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          leaveProject({
            projectId: items.projectId,
          })
        );
        Swal.fire(`${items.title}을 떠났습니다.`, "", "success");
      }
    });
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
      <div>
        {isEditable ? (
          <div className={styles.title}>
            <EditableProjectCard
              projectId={items.projectId}
              existingTitle={items.title}
            />
          </div>
        ) : (
          <div className={styles.title} onClick={clickProject}>
            {items.title}
          </div>
        )}

        <div className={styles.home_profile} onClick={clickProject}>
          {/*mysql은 아이디 값이 숫자로만 들어와서 계속 중복 key오류가 떠서 key값 고유값으로 변경함*/}
          {items &&
            items.users?.map((profile) => {
              return (
                <div
                  className={styles.profile_image}
                  key={Math.ceil(Math.random() * Date.now())}
                >
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
      {/*오너일 경우 수정하기와 삭제하기, 아닐경우는 방 나가기가 나옴*/}
      {isOwner ? (
        <div className={styles.icons}>
          <Icon
            className={styles.icon}
            icon="akar-icons:edit"
            onClick={editableProject}
          />
          <Icon
            className={styles.icon}
            icon="ant-design:delete-outlined"
            onClick={clickDeleteProject}
          />
        </div>
      ) : (
        <div className={styles.icons} onClick={clickLeaveProject}>
          <Icon className={styles.icon} icon="system-uicons:exit-right" />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
