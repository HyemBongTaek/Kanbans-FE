import { useEffect, useRef, useState } from "react";

import { Icon } from "@iconify/react";

const Timer = () => {
  const [seconds, setSeconds] = useState(5);
  const [min, setMin] = useState(0);
  const [isPlay, isSetPlay] = useState(false);
  const [isPause, isSetPause] = useState(false);
  const [relaxTime, isRelaxTime] = useState(false);

  const timerId = useRef(null);
  const time = useRef(5);

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSeconds(time.current % 60);
      time.current -= 1;
      if (time.current < 0) {
        clearInterval(timerId.current);
        console.log("아이고끝남");
      }
    }, 1000);
    isSetPlay(true);
  };

  const stopTimer = () => {
    isSetPause(true);
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  const reStartTimer = () => {
    isSetPause(false);
    startTimer();
  };

  const resetTimer = () => {
    isSetPlay(false);
    time.current = 1500;
    stopTimer();
    setSeconds(0);
    setMin(25);
  };

  return (
    <div>
      <section>
        {isPlay ? (
          <>
            {isPause ? (
              <div onClick={reStartTimer}>
                <Icon
                  icon="ant-design:play-circle-filled"
                  color="#8c8c8c"
                  height="30"
                />
                restart
              </div>
            ) : (
              <div onClick={stopTimer}>
                <Icon
                  icon="ant-design:pause-circle-filled"
                  color="#8c8c8c"
                  height="30"
                />
              </div>
            )}

            <div onClick={resetTimer}>
              <Icon
                icon="ic:baseline-restart-alt"
                color="#8c8c8c"
                height="30"
              />
              Reset
            </div>
          </>
        ) : (
          <div onClick={startTimer}>
            <Icon
              icon="ant-design:play-circle-filled"
              color="#8c8c8c"
              height="30"
            />
          </div>
        )}
      </section>
      <div>
        {min}:{`${seconds < 10 ? `0${seconds}` : seconds}`}
      </div>
    </div>
  );
};

export default Timer;
