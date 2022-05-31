import * as React from "react";
import { motion } from "framer-motion";
import "../_text.scss";
import { MenuItem } from "./MenuItem";
import CocoriLogo from "../../../../static/image/cocoli_white.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ isOpen, toggleOpen }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userSlice.userInfo);
  console.log(userInfo);
  return (
    <>
      {toggleOpen && isOpen && (
        <motion.ul variants={variants}>
          <div>
            <img
              src={CocoriLogo}
              alt="logo_image"
              onClick={() => navigate("/")}
            />
            <img src={userInfo.profileImage} alt="profile_image" />
            <div>{userInfo.name}님 어서오세요</div>
          </div>
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
