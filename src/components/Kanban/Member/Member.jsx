import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOwner,
  changeOwnerDB,
  deleteProjectUser,
  getProjectUserList,
} from "../../../redux/Async/kanban";
import styles from "./_Member.module.scss";
import MemberCard from "./MemberCard";

const Member = ({ projectId, user }) => {
  const dispatch = useDispatch();
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    dispatch(
      getProjectUserList({
        projectId,
      })
    );
  }, [dispatch]);
  const memberList = useSelector((state) => state.kanbanSlice.members);

  const [members, setMembers] = useState(memberList);

  useEffect(() => {
    setMembers(memberList);
  }, [memberList]);
  console.log(user, "유저");
  console.log("맴버", memberList);

  const owner =
    memberList &&
    memberList
      .filter((member) => member.owner === 1)
      .reduce((acc, cur) => (acc, cur), {});
  useEffect(() => {
    if (owner && user && owner.id === user.id) {
      setIsOwner(true);
    } else {
      return setIsOwner(false);
    }
  }, [memberList, owner]);

  return (
    <>
      <div>
        <div className={styles.members}>
          {members &&
            members.map((member) => {
              return (
                <MemberCard
                  isOwner={isOwner}
                  member={member}
                  setIsOwner={setIsOwner}
                  projectId={projectId}
                  key={member.id.toString()}
                  userId={user.id}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Member;
