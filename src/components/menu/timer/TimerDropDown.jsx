import React, { useCallback, useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../hooks/useDetectOutsideClick";

const TimerDropDown = (setIsTime) => {
  const [isActive, setIsActive] = useState(false);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  console.log(isActive);

  const onSelectItem = useCallback((e) => {
    setIsTime(e.target.value);
    setIsActive((prev) => !prev);
  }, []);
  return (
    <div onClick={onActiveToggle}>
      <select onChange={onSelectItem}>
        <option>시간설정하기</option>
        <option value="1500">25분</option>
        <option value="1800">30분</option>
        <option value="2700">45분</option>
        <option value="3000">50분</option>
      </select>
    </div>
  );
};

export default TimerDropDown;
