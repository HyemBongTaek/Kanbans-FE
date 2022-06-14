import React, { useRef, useState } from "react";
import { useDetectOutsideClick } from "../../../../hooks/useDetectOutsideClick";
import SelectedDday from "../../utils/SelectedDday";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

const CardDetailLeft = () => {
  const [isDay, setIsDay] = useState(false);

  const daySelectedClick = () => {
    setIsDay(!isDay);
  };
  console.log(isDay);

  return (
    <ul>
      <li>헹구</li>
      <li>헹구</li>
      <li>
        <SelectedDday />
      </li>

      <li>헹구</li>
      <li>헹구</li>
    </ul>
  );
};

export default CardDetailLeft;
