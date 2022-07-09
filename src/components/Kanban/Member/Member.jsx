import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectUserList } from "../../../redux/Async/kanban";

const Member = ({ projectId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProjectUserList({
        projectId,
      })
    );
  }, [dispatch]);
  const memberList = useSelector((state) => state);

  console.log("맴버", memberList);
  return (
    <>
      <div>
        <div></div>
      </div>
    </>
  );
};

export default Member;
