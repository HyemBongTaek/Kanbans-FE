import React from "react";
import styles from "./style/_Dots.module.scss";
import classNames from "classnames";

const Dots = ({ pageIndex }) => {
  return (
    <div className={styles.dots}>
      <div className={styles.dots_style}>
        <div
          className={classNames(styles.dot, pageIndex === 1 && styles.black)}
        />
        <div
          className={classNames(styles.dot, pageIndex === 2 && styles.black)}
        />
        <div
          className={classNames(styles.dot, pageIndex === 3 && styles.black)}
        />
      </div>
    </div>
  );
};

export default Dots;
