import React, { useEffect, useRef, useState } from "react";

import styles from "./_Main.module.scss";
import { useSelector } from "react-redux";
import Main_image from "../../static/image/main_image.png";
import AuthModal from "../../components/Login/AuthModal";
import Dots from "../../components/utils/Dots";
import SecondMain from "../../components/Main/SecondMain";
import ThirdMain from "../../components/Main/ThirdMain";

const Main = () => {
  const loginModalOpen = useSelector((state) => state.commonSlice.openLogin);
  const scrollDiv = useRef();

  const [pageIndex, setPageIndex] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = scrollDiv.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          scrollDiv.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
          setIsActive(false);
          setPageIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          setPageIndex(3);
          setIsActive(false);
          scrollDiv.current.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          setPageIndex(3);
          setIsActive(true);
          scrollDiv.current.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          setPageIndex(1);
          setIsActive(false);
          scrollDiv.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          setPageIndex(1);
          setIsActive(false);
          scrollDiv.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          setPageIndex(2);
          setIsActive(true);
          scrollDiv.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDivRefCurrent = scrollDiv.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <div className={styles.main} ref={scrollDiv}>
      <Dots pageIndex={pageIndex} />
      <div className={styles.main_background}>
        {loginModalOpen && <AuthModal />}
        <div className={styles.title}>
          <div className={styles.big_title}>
            <span>스터디</span>부터 <span>협업</span>까지
            <br /> 함께하는 즐거움
          </div>
          <div className={styles.sub_title}>
            계획적으로 진행하는 <span>공부</span>
            <br /> 함께 진행해야 하는 <span>스터디</span>
            <br /> <span>협업</span>까지 코코리와 함께 무료로 진행해보세요.
          </div>
          <div className={styles.mobile_content}>
            모바일에서는 cocori 사이트의 사용이 불가합니다. 컴퓨터로 접속해
            주세요.
          </div>
        </div>
        <div className={styles.image}>
          <img src={Main_image} alt="main_image" />
        </div>
      </div>
      <div className={styles.second_background}>
        <div>
          <SecondMain />
        </div>
      </div>
      <div className={styles.third_background}>
        <ThirdMain isActive={isActive} />
      </div>
    </div>
  );
};

export default Main;
