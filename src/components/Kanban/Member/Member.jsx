import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectUser,
  getProjectUserList,
} from "../../../redux/Async/kanban";
import styles from "./_Member.module.scss";

const Member = ({ projectId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProjectUserList({
        projectId,
      })
    );
  }, [dispatch]);
  const memberList = useSelector((state) => state.kanbanSlice.members);

  const deleteProjectMember = ({ userId }) => {
    dispatch(
      deleteProjectUser({
        projectId,
        userId,
      })
    );
  };
  console.log("맴버", memberList);
  return (
    <>
      <div>
        <div>
          {memberList &&
            memberList.map((member) => {
              const userId = member.id;
              return (
                <div className={styles.card} key={userId}>
                  <img src={member.profileImage} alt="profile_image" />
                  <div>{member.name}</div>
                  <button onClick={() => deleteProjectMember({ userId })}>
                    삭제하기
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Member;
