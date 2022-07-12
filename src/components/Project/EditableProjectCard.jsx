// 프로젝트카드에서 사용하려고 했으나 너무 길어져서 따로 뺌.

import React, { useState } from "react";
import SwitchButton from "../common/SwitchButton";
import { useDispatch } from "react-redux";
import { updateProject } from "../../redux/Async/projects";

const EditableProjectCard = ({ projectId, existingTitle }) => {
  const dispatch = useDispatch();
  const [isOn, setIsOn] = useState(false);
  const [title, setTitle] = useState(existingTitle);

  const changeProject = (e) => {
    e.preventDefault();
    const permission = isOn ? "private" : "public";
    dispatch(
      updateProject({
        title: title,
        permission: permission,
        projectId: projectId,
      })
    );
  };

  return (
    <div>
      <form onSubmit={changeProject}>
        <label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </form>
      <SwitchButton isOn={isOn} onClick={() => setIsOn(!isOn)} />
    </div>
  );
};

export default EditableProjectCard;
