import React from "react";
import { motion } from "framer-motion";
import "./_SwitchButton.scss";

function SwitchButton({ isOn, ...props }) {
  console.log("스위치버튼", props);
  const className = `switch ${isOn ? "on" : "off"}`;

  return (
    <motion.div animate className={className} {...props}>
      <motion.div animate />
    </motion.div>
  );
}

export default SwitchButton;
