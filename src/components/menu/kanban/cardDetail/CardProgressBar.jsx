import React, { useEffect, useState } from "react";
import ProgressCard from "./ProgressCard";
import ProgressData from "./ProgressData";

const CardProgressBar = () => {
  //데이터 불러오기
  const [progress, setProgress] = useState(ProgressData);

  //진행바 진행율 구하기.
  function findCheck(el) {
    if (el.checked === true) {
      return true;
    }
  }

  const dataCount = progress.progress.filter(findCheck);
  const [checkCount, setCheckCount] = useState(dataCount.length);
  let checkedCountTotal = progress.progress.length;

  const progressRate = Math.ceil((checkCount / checkedCountTotal) * 100);

  return (
    <div>
      <div style={{ width: "520px", background: "#C4C4C4", height: "25px" }}>
        <div
          style={{
            width: `${progressRate}%`,
            background: "#01CD6B",
            height: "25px",
          }}
        />
      </div>
      {progress.progress.map((task) => {
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
  );
};

export default CardProgressBar;
