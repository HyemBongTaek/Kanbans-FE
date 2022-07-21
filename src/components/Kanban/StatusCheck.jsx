import React from "react";
import { motion } from "framer-motion";
import { statusChangeKanbanCard } from "../../redux/Async/kanban";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { cardStatusSocket } from "../../redux/Slice/socketSlice";

const StatusCheck = ({ boardId, cardId, projectId }) => {
  const dispatch = useDispatch();
  console.log(boardId, cardId);

  const statusButton = [
    { value: "progress", color: "#3F4650" },
    { value: "hold", color: "#EACC57" },
    { value: "finish", color: "#01cd6b" },
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
    dispatch(
      statusChangeKanbanCard({
        boardId,
        cardId,
        status: e.target.value,
      })
    );
    dispatch(
      cardStatusSocket({
        room: projectId,
        cardId,
        status: e.target.value,
      })
    );
  };

  return (
    <div>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={sideVariants}
      >
        {statusButton.map((status, index) => {
          return (
            <>
              <motion.button
                value={status.value}
                onClick={statusClick}
                style={{
                  backgroundColor: `${status.color}`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  border: "none",
                  marginRight: "5px",
                }}
                key={index}
                whileTap={{ scale: 0.5 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
              />
            </>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatusCheck;
