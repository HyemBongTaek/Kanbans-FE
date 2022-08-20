import React from "react";
import YouTube from "react-youtube";
import styles from "./style/_SecondMain.module.scss";

const SecondMain = () => {
  return (
    <div className={styles.second_main}>
      <div className={styles.content}>
        <div>
          시작하기 전
          <br /> 코코리에 대해
          <br /> 알아봅니다
        </div>
      </div>
      <div className={styles.youtube}>
        <div />
        <YouTube
          videoId="-_psWkpC5r8"
          opts={{
            width: "800",
            height: "500",
            playerVars: {
              autoplay: 0,
              rel: 0,
              modestbranding: 1,
            },
          }}
          onEnd={(e) => {
            e.target.stopVideo(0);
          }}
        />
      </div>
    </div>
  );
};

export default SecondMain;
