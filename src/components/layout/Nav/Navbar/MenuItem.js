import * as React from "react";
import { motion } from "framer-motion";
import "../Style/_Navbar.scss";
import styles from "../Style/_AfterLogin.module.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];
const menus = ["home", "profile", "project", "timer", "모르게따"];
const icons = [
  "fa:home",
  "ph:users",
  "bi:calendar-check",
  "fa:home",
  "fa:home",
];
const navigation = ["/", "/Profile", "/project", "/timer", "/timer"];

export const MenuItem = ({ i }) => {
  const navigate = useNavigate();
  // const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      onClick={() => {
        navigate(`${navigation[i]}`);
      }}
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className={styles.icons} icon={icons[i]} />

      <div className="text-placeholder">{menus[i]}</div>
    </motion.li>
  );
};
