import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./style/_ThirdMain.module.scss";

//슬라이더 이미지 파일
import img1 from "../../static/image/img1.png";
import img2 from "../../static/image/img2.png";
import img3 from "../../static/image/img3.png";
import img4 from "../../static/image/img4.png";

const ThirdMain = ({ isActive }) => {
  const totalSlides = [img1, img2, img3, img4];
  const [curSlide, setCurSlide] = useState(0);
  const [curDot, setCurDot] = useState(0);
  const slideRef = useRef(null);

  return (
    <>
      <div className={styles.third_main}>
        <img src={img3} alt="메인이미지" />
      </div>
    </>
  );
};

export default ThirdMain;
