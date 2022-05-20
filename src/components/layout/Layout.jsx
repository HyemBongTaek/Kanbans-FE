import React, { useState } from "react";
import Header from "./Header";
import "./styles/_Layout.scss";

const Layout = (props) => {
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
