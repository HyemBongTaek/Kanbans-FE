import React from "react";
import styles from "./_Member.module.scss";
import { changeOwnerDB, deleteProjectUser } from "../../../redux/Async/kanban";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";

const MemberCard = ({ member, projectId, isOwner, userId, setIsOwner }) => {
  const dispatch = useDispatch();
  const deleteProjectMember = () => {
    dispatch(
      deleteProjectUser({
        projectId,
        userId: member.id,
      })
    );
  };
  const changeOwner = () => {
    dispatch(
      changeOwnerDB({
        sender: userId,
        receiver: member.id,
        projectId,
      })
    );
    setIsOwner(false);
  };

  return (
    <div className={styles.card}>
      {member.owner === 1 && (
        <Icon className={styles.owner} icon="noto-v1:crown" />
      )}
      <img src={member.profileImage} alt="profile_image" />
      <div className={styles.name}>{member.name}</div>
      <div className={styles.introduce}>{member.introduce}</div>
      {isOwner && (
        <>
          <button className={styles.button} onClick={deleteProjectMember}>
            제외하기
          </button>
          <button className={styles.button} onClick={changeOwner}>
            Owner 변경하기
          </button>
        </>
      )}
    </div>
  );
};

export default MemberCard;
