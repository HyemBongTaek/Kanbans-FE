import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ContextStore from "../../contextStore";

const TimerFeatures = (props) => {
  return (
    <>
      <ContextStore.Provider value={{}}>{props.children}</ContextStore.Provider>
    </>
  );
};

export default TimerFeatures;
