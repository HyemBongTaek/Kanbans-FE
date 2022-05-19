import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import "./styles/_Layout.scss";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { getUserInfo } from "../../redux/Async/user";
import { useDispatch, useSelector } from "react-redux";

const Layout = (props) => {
  console.log(props);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="main">
        {isOpen ? (
          <div className="open_nav">{props.children}</div>
        ) : (
          <div className="close_nav">{props.children}</div>
        )}
      </main>
    </div>
  );
};

export default Layout;
