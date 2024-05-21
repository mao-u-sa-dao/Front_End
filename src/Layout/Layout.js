import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
