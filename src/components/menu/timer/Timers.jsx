import React, { useState } from "react";
import WorkTimer from "./WorkTimer";
import { useSelector } from "react-redux";
import RelaxTimer from "./RelaxTimer";

const Timers = () => {
  const restTimer = useSelector((state) => state.commonSlice.isRestTime);
  console.log(restTimer, "시간확인");
  return (
    <>
      {restTimer ? (
        <>
          <RelaxTimer />
        </>
      ) : (
        <WorkTimer />
      )}
    </>
  );
};

export default Timers;
