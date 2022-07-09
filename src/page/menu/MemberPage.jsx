import React from "react";
import styles from "./_MemberPage.module.scss";
import Member from "../../components/Kanban/Member/Member";

const MemberPage = ({ projectId }) => {
  return (
    <div>
      <Member projectId={projectId} />
    </div>
  );
};

export default MemberPage;
