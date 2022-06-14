import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { isRestTimeReducer } from "../../../redux/Slice/commonSlice";
import styles from "./style/_WorkTimer.module.scss";

// notification sound
import notiSound from "../../../static/audio/Ascending 4.mp3";

// 아이콘, notification, sound
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import useSound from "use-sound";

const WorkTimer = () => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(5);
  const [min, setMin] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const timerId = useRef(null);
  const time = useRef(5);
  const [play] = useSound(notiSound);

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setMin(parseInt(time.current / 60));
      setSeconds(time.current % 60);
      time.current -= 1;
      if (time.current < 0) {
        dispatch(isRestTimeReducer());
        clearInterval(timerId.current);
        play();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "잠시 휴식시간입니다!",
        });
      }
    }, 1000);
    setIsPlay(true);
  };

  //시간 도중에 멈추고 싶을 때
  const stopTimer = () => {
    setIsPause(true);
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  //일시정지한 시간 다시 시작할 때
  const reStartTimer = () => {
    setIsPause(false);
    startTimer();
  };

  //시간 리셋하고 싶을 때
  const resetTimer = () => {
    setIsPlay(false);
    time.current = 5;
    stopTimer();
    setSeconds(5);
    setMin(0);
  };

  return (
    <>
      <div className={styles.work_timer}>
        <div>
          {min}:{`${seconds < 10 ? `0${seconds}` : seconds}`}
        </div>
        {isPlay ? (
          <>
            {isPause ? (
              <div onClick={reStartTimer}>
                <Icon
                  className={styles.icon}
                  icon="ant-design:play-circle-filled"
                />
                restart
              </div>
            ) : (
              <div onClick={stopTimer}>
                <Icon
                  className={styles.icon}
                  icon="ant-design:pause-circle-filled"
                />
              </div>
            )}

            <div onClick={resetTimer}>
              <Icon className={styles.icon} icon="ic:baseline-restart-alt" />
              Reset
            </div>
          </>
        ) : (
          <div onClick={startTimer}>
            <Icon
              className={styles.icon}
              icon="ant-design:play-circle-filled"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WorkTimer;
