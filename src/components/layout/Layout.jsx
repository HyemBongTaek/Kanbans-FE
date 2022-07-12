import React, { useState } from "react";
import Header from "./Nav/Header";
import "./styles/_Layout.scss";
import { useCycle } from "framer-motion";

const Layout = (props) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div>
      {/*<Header isOpen={isOpen} toggleOpen={toggleOpen} />*/}
      <Header />
      <main className="layout_wrapper">
        <div>{props.children}</div>
      </main>
      {/*<main className="main">*/}
      {/*  {isOpen ? (*/}
      {/*    <div className="open_nav">{props.children}</div>*/}
      {/*  ) : (*/}
      {/*    <div className="close_nav">{props.children}</div>*/}
      {/*  )}*/}
      {/*</main>*/}
    </div>
  );
};

export default Layout;
