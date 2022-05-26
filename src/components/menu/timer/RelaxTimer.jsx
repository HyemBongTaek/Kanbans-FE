import React from "react";
import { isRestTimeReducer } from "../../redux/Slice/commonSlice";
import { useDispatch } from "react-redux";

const RelaxTimer = () => {
  const dispatch = useDispatch();

  const clickTimer = () => {
    dispatch(isRestTimeReducer());
  };
  return (
    <div>
      <div onClick={clickTimer}>헹구</div>
    </div>
  );
};

export default RelaxTimer;
