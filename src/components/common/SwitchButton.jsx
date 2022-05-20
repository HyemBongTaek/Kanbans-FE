import React from "react";
import { motion } from "framer-motion";
import "./_SwitchButton.scss";

function SwitchButton({ isOn, ...props }) {
  const className = `switch ${isOn ? "on" : "off"}`;

  return (
    <motion.div animate className={className} {...props}>
      <motion.div animate />
    </motion.div>
  );
}

export default SwitchButton;
