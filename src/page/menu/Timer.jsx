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
          <div
            className={styles.button_table}
            onClick={() => setIsTable((pre) => !pre)}
          >
            <button>시간 확인하기</button>
          </div>
        )}
        <FocusTimer isTable={isTable} />
      </div>
    </>
  );
};

export default Timer;
