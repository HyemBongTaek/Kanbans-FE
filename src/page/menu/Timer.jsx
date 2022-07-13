import React from "react";
import TimerTable from "../../components/Timer/TimerTable";
import FocusRestTimer from "../../components/Timer/FocusRestTimer";

const Timer = () => {
  return (
    <>
      <div>
        <TimerTable />
        <FocusRestTimer />
      </div>
    </>
  );
};

export default Timer;
