import { Icon } from "@iconify/react";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import styles from "./_Common.module.scss";

const SearchInput = ({ isSearch, setIsSearch }) => {
  const searchHandler = (e) => {
    e.preventDefault();
    setIsSearch(e.target.value);
  };

  return (
    <div className={styles.search}>
      <form>
        <label className={styles.search_label}>
          <Icon className={styles.search_icon} icon="carbon:search" />
          <input placeholder="Search" onChange={searchHandler} />
        </label>
      </form>
    </div>
  );
};

export default SearchInput;
