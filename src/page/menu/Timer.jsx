import React, { useState } from "react";
import styles from "./_Timer.module.scss";

import TimerTable from "../../components/Timer/TimerTable";
import FocusTimer from "../../components/Timer/FocusTimer";

const Timer = () => {
  const [isTable, setIsTable] = useState(false);
  return (
    <>
      <div className={styles.timer}>
        {isTable ? (
          <div className={styles.table}>
            <TimerTable setIsTable={setIsTable} />
          </div>
        ) : (
          <div onClick={() => setIsTable((pre) => !pre)}>
            Focus Time 기록 확인하기
          </div>
        )}
        <FocusTimer isTable={isTable} />
      </div>
    </>
  );
};

export default Timer;
