import React from "react";

import ReactTooltip from "react-tooltip";

const Tooltip = ({ content, color, children }) => {
  return (
    <>
      <ReactTooltip style={{ textAlign: "center" }} />
      <a data-tip={content} data-iscapture="true">
        {children}
      </a>

      {/*<ReactTooltip place="top" type={color} effect="solid" />*/}
    </>
  );
};

export default Tooltip;
