import React, { useState } from "react";
import { isRestTimeReducer } from "../../../redux/Slice/commonSlice";
import { useDispatch } from "react-redux";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "./style/_RelaxTimer.module.scss";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { formatRemainingTime } from "./utils/FormatTime";

const RelaxTimer = () => {
  const hourSeconds = 300;

  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const clickTimer = () => {
    dispatch(isRestTimeReducer());
  };
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
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

      Toast.fire({
        icon: "success",
        title: "휴식시간이 끝났습니다.",
      });
      return dispatch(isRestTimeReducer());
      // <div className={styles.timer}>Too lale...</div>;
    }

    return (
      <div className={styles.timer}>
        <div className={styles.text}>Relax Time</div>
        <div className={styles.value}>{formatRemainingTime(remainingTime)}</div>
        <div>
          {play ? (
            <Icon
              onClick={() => setPlay(false)}
              className={styles.icon}
              icon="ant-design:pause-circle-filled"
            />
          ) : (
            <Icon
              onClick={() => setPlay(true)}
              className={styles.icon}
              icon="ant-design:play-circle-filled"
            />
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className={styles.timer_wrapper}>
          <CountdownCircleTimer
            isPlaying={play}
            duration={hourSeconds}
            colors={[["#218380"]]}
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div onClick={clickTimer}>휴식시간끝내기</div>
      </div>
    </>
  );
};

export default RelaxTimer;
