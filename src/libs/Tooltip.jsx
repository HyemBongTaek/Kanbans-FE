import React from "react";
import styles from "./_Tooltip.module.scss";

const Tooltip = ({ children, massage }) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.tooltip}>{massage}</div>
    </div>
  );
};

export default Tooltip;
