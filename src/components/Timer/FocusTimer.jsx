import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import styles from "./style/_FocusTimer.module.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import useSound from "use-sound";

import AlarmSound from "../../static/audio/Ascending 4.mp3";
import { addTimer, getTimer } from "../../redux/Async/timer";
import { format } from "date-fns";

const FocusTimer = ({ isTable }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [playTime, setPlayTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [reStart, setReStart] = useState(0);
  const [soundAlarm, setSoundAlarm] = useState(false);

  const [play] = useSound(AlarmSound);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      soundAlarm && play();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire(
        {
          icon: "success",
          title: type ? "다시 집중할 시간입니다" : "잠시 휴식을 취해보세요",
        },
        1000
      );
    }

    const minutes = Math.floor(remainingTime / 60)
      .toString()
      .padStart(2, 0);
    const seconds = (remainingTime % 60).toString().padStart(2, 0);

    return (
      <div className={styles.clock_wrapper}>
        <span className={styles.clock_title}>
          {!type ? "Focus Time" : "Break"}
          {isPlay ? " Running" : " Paused"}
        </span>
        <div className={styles.clock_value}>
          {minutes}:{seconds}
        </div>
        <StartStop />
      </div>
    );
  };

  const StartStop = () => {
    if (isPlay) {
      return (
        <Icon
          icon="bi:pause-circle-fill"
          color="#8c8c8c"
          height="30"
          onClick={ClickStartHandler}
        />
      );
    } else {
      return (
        <Icon
          icon="bi:play-circle-fill"
          color="#3b3b39"
          height="30"
          onClick={ClickStartHandler}
        />
      );
    }
  };

  const ClickStartHandler = () => {
    setIsPlay(!isPlay);
  };
  const NowDate = Date.now();
  const todayDate = useMemo(() => format(new Date(NowDate), "yyyy-MM-dd"));

  const complete = () => {
    if (type === false) {
      dispatch(
        addTimer({
          createdAt: todayDate,
          time: playTime,
        })
      );
    }
    setType((pre) => !pre);
    setReStart((pre) => pre + 1);
    setIsPlay(false);
  };

  const resetBtn = () => {
    setReStart((pre) => pre + 1);
    setIsPlay(false);
  };

  const changeTime = (e) => {
    const btnText = e.target.innerHTML;
    if (btnText === "-" && playTime > 60 && !type) {
      setPlayTime((pre) => pre - 60);
    } else if (btnText === "+" && !type) {
      setPlayTime((pre) => pre + 60);
    } else if (btnText === "-" && breakTime > 60) {
      setBreakTime((pre) => pre - 60);
    } else if (btnText === "+") {
      setBreakTime((pre) => pre + 60);
    }
  };

  return (
    <div
      className={isTable ? styles.small_timer_wrapper : styles.timer_wrapper}
    >
      <div className={isTable ? styles.small_timer_clock : styles.timer_clock}>
        <CountdownCircleTimer
          key={reStart}
          isPlaying={isPlay}
          duration={type ? breakTime : playTime}
          colors={["#3F4650"]}
          onComplete={() => {
            complete();
            return { shouldRepeat: true, delay: 1.5 };
          }}
          size={250}
          strokeWidth={8}
          trailColor={"#"}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div
        className={isTable ? styles.small_timer_setting : styles.timer_setting}
      >
        <div className={styles.title}>Focus time 설정하기</div>
        <div className={styles.setup_timer}>
          <button className={styles.button_minus} onClick={changeTime}>
            -
          </button>
          <span>{type ? breakTime / 60 : playTime / 60}</span>
          <button className={styles.button_plus} onClick={changeTime}>
            +
          </button>
        </div>
        <div>
          <button
            className={
              type === false ? styles.button_session : styles.button_break
            }
            onClick={() => setType(false)}
          >
            Focus Time
          </button>
          <button
            className={
              type === true ? styles.button_session : styles.button_break
            }
            onClick={() => setType(true)}
          >
            Break Time
          </button>
        </div>
        <div className={styles.timer_icons}>
          <StartStop />
          <Icon
            icon="material-symbols:restart-alt-rounded"
            color="#8c8c8c"
            height="30"
            onClick={resetBtn}
          />
          <Icon
            icon={soundAlarm ? "akar-icons:sound-on" : "akar-icons:sound-off"}
            color="#8c8c8c"
            height="30"
            onClick={() => setSoundAlarm((pre) => !pre)}
          />
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
