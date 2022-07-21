import { Icon } from "@iconify/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/_ProjectCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bookmarkProject,
  deleteProject,
  leaveProject,
  updateProject,
} from "../../redux/Async/projects";
import EditableProjectCard from "./EditableProjectCard";
import Swal from "sweetalert2";

const ProjectCard = (props) => {
  const dispatch = useDispatch();
  const { items } = props;

  const navigate = useNavigate();
  const [projectBookmark, setProjectBookmark] = useState(items.bookmark);
  const [isEditable, setIsEditable] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isPermission, setIsPermission] = useState(false);

  const userInfo = useSelector((state) => state.userSlice.userInfo.id);
  const projectMemberList = useMemo(() => {
    if (items.users.length > 3) {
      return items.users.slice(0, 3);
    } else {
      return items.users;
    }
  });
  useEffect(() => {
    if (userInfo === items.owner) {
      setIsOwner(true);
    }
  }, [userInfo]);

  const permission = isPermission ? "private" : "public";
  //프로젝트 즐겨찾기
  const clickBookmarkHandler = () => {
    setProjectBookmark(!projectBookmark);
    dispatch(
      bookmarkProject({
        projectId: items.projectId,
      })
    );
  };

  const exitProjectHandler = () => {
    Swal.fire({
      title: isOwner
        ? "프로젝트를 삭제하시겠습니까??"
        : "프로젝트를 떠나시겠습니까?",
      text: isOwner
        ? "프로젝트 삭제하면 다시 복구할 수 없습니다."
        : "프로젝트 초대를 받기 전까지는 다시 참가할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        isOwner
          ? dispatch(
              deleteProject({
                projectId: items.projectId,
              })
            )
          : dispatch(
              leaveProject({
                projectId: items.projectId,
              })
            );

        Swal.fire(
          isOwner
            ? `${items.title}을 삭제하였습니다.`
            : `${items.title}을 떠났습니다.`,
          "",
          "success"
        );
      }
    });
  };

  const changeProject = (e) => {
    e.preventDefault();
    setIsPermission((pre) => !pre);
    dispatch(
      updateProject({
        permission: permission,
        projectId: items.projectId,
      })
    );
  };

  return (
    <div className={styles.home_card}>
      <div className={styles.board_status}>
        {isEditable ? (
          <div className={styles.public_private} onClick={changeProject}>
            {permission}
          </div>
        ) : (
          <div className={styles.public_private}>{items.permission}</div>
        )}
        <Icon
          onClick={clickBookmarkHandler}
          className={
            projectBookmark ? styles.board_favorite : styles.board_unfavorite
          }
          icon={projectBookmark ? "bi:bookmark-star-fill" : "bi:bookmark-star"}
        />
      </div>
      <div>
        <div className={styles.title}>
          {isEditable ? (
            <EditableProjectCard
              setIsEditable={setIsEditable}
              projectId={items.projectId}
              existingTitle={items.title}
            />
          ) : (
            <div
              onClick={() =>
                navigate(`/board/${items.projectId}`, { state: items.title })
              }
            >
              {items.title}
            </div>
          )}
        </div>
        <div
          className={styles.home_profile}
          onClick={() =>
            navigate(`/board/${items.projectId}`, { state: items.title })
          }
        >
          {projectMemberList &&
            projectMemberList?.map((profile) => {
              return (
                <div className={styles.profile_image} key={profile.userId}>
                  <img src={profile.profileImageURL} alt="profile_image" />
                </div>
              );
            })}
          {projectMemberList.length === 3 && (
            <div className={styles.profile_image}>
              <Icon
                icon="ph:dots-three-circle-light"
                color="#545454"
                height="58"
              />
            </div>
          )}
        </div>
      </div>
      {/*오너일 경우 수정하기와 삭제하기, 아닐경우는 방 나가기가 나옴*/}
      {isOwner ? (
        <div className={styles.icons}>
          <Icon
            className={styles.icon}
            icon="akar-icons:edit"
            onClick={() => setIsEditable(true)}
          />
          <Icon
            className={styles.icon}
            icon="ant-design:delete-outlined"
            onClick={exitProjectHandler}
          />
        </div>
      ) : (
        <div className={styles.icons} onClick={exitProjectHandler}>
          <Icon className={styles.icon} icon="system-uicons:exit-right" />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
