import React, { useEffect, useState } from "react";
import ProgressCard from "./ProgressCard";
import DetailInput from "./DetailInput";
import styles from "./style/_CardProgressBar.module.scss";
import { useSelector } from "react-redux";

const CardProgressBar = ({ cardId, setIsProgressCheck, isProgressCheck }) => {
  const progressData = useSelector((state) => state.cardDetailSlice.tasks);

  //진행바 진행율 구하기.
  function findCheck(el) {
    if (el.check === true) {
      return true;
    }
  }
  const dataCount = progressData.filter(findCheck);

  const [checkCount, setCheckCount] = useState(dataCount.length);
  let checkedCountTotal = progressData.length;

  const progressRate = Math.ceil((checkCount / checkedCountTotal) * 100);

  useEffect(() => {
    setCheckCount(dataCount ? dataCount.length : "");
  });

  return (
    <>
      <div className={styles.progress_bar}>
        <div
          style={{
            width: `${progressRate ? progressRate : 0}%`,
            background: "#01CD6B",
            height: "25px",
          }}
        />
      </div>

      <div className={styles.progress_area}>
        {/*task 모두 보기 또는 task 체크 안된 목록만 보기 */}
        {isProgressCheck
          ? progressData &&
            progressData
              .filter((task) => task.check === false)
              .map((task) => {
                return (
                  <ProgressCard
                    key={task.id}
                    items={task}
                    checkCount={checkCount}
                    setCheckCount={setCheckCount}
                  />
                );
              })
          : progressData &&
            progressData?.map((task) => {
              return (
                <ProgressCard
                  key={task.id}
                  items={task}
                  checkCount={checkCount}
                  setCheckCount={setCheckCount}
                />
              );
            })}
      </div>
      <DetailInput
        type="progress"
        cardId={cardId}
        checkCount={checkCount}
        setCheckCount={setCheckCount}
      />
    </>
  );
};

export default React.memo(CardProgressBar);
