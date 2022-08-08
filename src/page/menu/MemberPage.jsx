import React from "react";
import styles from "./_MemberPage.module.scss";
import Member from "../../components/Kanban/Member/Member";
import { useSelector } from "react-redux";

const MemberPage = ({ projectId }) => {
  const user = useSelector((state) => state.userSlice.userInfo);
  return (
    <div>
      <Member projectId={projectId} user={user} />
    </div>
  );
};

export default MemberPage;
