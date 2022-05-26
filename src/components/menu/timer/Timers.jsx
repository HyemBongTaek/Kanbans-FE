import React, { useState } from "react";
import WorkTimer from "./WorkTimer";
import { useSelector } from "react-redux";
import RelaxTimer from "./RelaxTimer";

const Timers = () => {
  const restTimer = useSelector((state) => state.commonSlice.isRestTime);
  return (
    <>
      {restTimer ? (
        <>
          <WorkTimer />
        </>
      ) : (
        <RelaxTimer />
      )}
    </>
  );
};

export default Timers;
