import React from "react";

import ReactTooltip from "react-tooltip";

const Tooltip = ({ content, color, children }) => {
  return (
    <>
      <a data-tip={content} style={{ textAlign: "center" }}>
        {children}
      </a>
      <ReactTooltip place="top" type={color} effect="float" />
    </>
  );
};

export default Tooltip;
