import React, { useEffect, useState } from "react";

const ProgressCard = (props) => {
  console.log("카드프롭", props);
  const [isChecked, setIsChecked] = useState(props.items.checked);

  let checkCount = props.checkCount;
  let setCheckCount = props.setCheckCount;

  const changeHandler = (checked) => {
    if (checked) {
      setIsChecked(!isChecked);
      setCheckCount((checkCount += 1));
    } else {
      // 체크 해제
      setIsChecked(!isChecked);
      setCheckCount((checkCount -= 1));
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          changeHandler(e.currentTarget.checked);
        }}
      />
      {props.items.content}
    </div>
  );
};

export default ProgressCard;
