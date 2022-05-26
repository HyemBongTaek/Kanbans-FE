import * as React from "react";
import { motion } from "framer-motion";
import "../_text.scss";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ isOpen, toggleOpen }) => {
  return (
    <>
      {toggleOpen && isOpen && (
        <motion.ul variants={variants}>
          <div>헹구</div>
          {itemIds.map((i) => (
            <MenuItem i={i} key={i} />
          ))}
        </motion.ul>
      )}
    </>
  );
};

const itemIds = [0, 1, 2, 3, 4];

export default Navigation;
