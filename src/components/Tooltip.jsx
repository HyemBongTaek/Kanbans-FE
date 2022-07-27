import React from "react";

import ReactTooltip from "react-tooltip";

export const DivTooltip = ({ content, color, children }) => {
  return (
    <>
      <a data-tip={content}>
        {children}
        <ReactTooltip place="top" type={color} effect="float" />
      </a>
    </>
  );
};

export const Tooltip = ({ content, color, children }) => {
  return (
    <>
      <a data-tip={content}>
        {children}
        <ReactTooltip place="top" type={color} effect="float" />
      </a>
    </>
  );
};
