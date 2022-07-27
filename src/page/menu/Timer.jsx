import React from "react";
import TimerTable from "../../components/Timer/TimerTable";
import FocusRestTimer from "../../components/Timer/FocusRestTimer";
import styles from "./_Timer.module.scss";

const Timer = () => {
  return (
    <>
      <div className={styles.timer}>
        <div className={styles.table}>
          <TimerTable />
        </div>
        <FocusRestTimer />
      </div>
    </>
  );
};

export default Timer;
