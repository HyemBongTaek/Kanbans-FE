import React from "react";
import styles from "./testcheck.module.scss";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { statusChangeKanbanCard } from "../../../redux/Async/kanban";
import { useDispatch } from "react-redux";

const TestCheck = ({ boardId, cardId }) => {
  const dispatch = useDispatch();
  console.log(boardId, cardId);
  const statusButton = [
    { value: "progress" },
    { value: "hold" },
    { value: "finish" },
  ];
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };
  //
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const statusClick = (e) => {
    console.log("value", e.target.value);
    dispatch(
      statusChangeKanbanCard({
        boardId,
        cardId,
        status: e.target.value,
      })
    );
  };

  return (
    <div>
      <motion.div
        className={styles.add_color}
        initial="closed"
        animate="open"
        exit="closed"
        variants={sideVariants}
      >
        {statusButton.map(({ value }) => (
          <>
            <motion.button
              value={value}
              onClick={statusClick}
              key={value}
              whileTap={{ scale: 0.5 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              variants={itemVariants}
            />
          </>
        ))}
      </motion.div>
    </div>
  );
};

export default TestCheck;
