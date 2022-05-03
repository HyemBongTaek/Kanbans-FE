import { Icon } from "@iconify/react";
import React from "react";

import { useDispatch } from "react-redux";
import styles from "./_Common.module.scss";

const SearchInput = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.search}>
      <label className={styles.search_label}>
        <Icon className={styles.search_icon} icon="carbon:search" />
        <input placeholder="Search" />
      </label>
    </div>
  );
};

export default SearchInput;
