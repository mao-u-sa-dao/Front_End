import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink() {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active"); // Thêm class "active" cho link được click
    }

    linkColor.forEach((l) => l.addEventListener("click", colorLink));

    // Cleanup event listeners on unmount
    return () => {
      const toggle = document.getElementById("header-toggle");
      if (toggle) {
        toggle.removeEventListener("click", handleLinkClick);
      }
      linkColor.forEach((l) => l.removeEventListener("click", colorLink));
    };
  }, []);
  return (
    <div className="body">
      <header
        id="header"
        className={`header-admin ${isSidebarOpen ? "body-pd" : ""}`}
      >
        <div className="header_toggle ms-1" onClick={toggleSidebar}>
          <i
            className={`bx ${isSidebarOpen ? "bx-x" : "bx-menu"}`}
            id="header-toggle"
          ></i>
        </div>
        <div className="marquee">
          <h2>Admin</h2>
        </div>
        <div className="header_img">
          <img src="https://via.placeholder.com/150" alt="profile" />
        </div>
      </header>
      <div
        className={`l-navbar ${isSidebarOpen ? "show-nav-admin" : ""}`}
        id="nav-bar"
      >
        <nav className="nav">
          <div>
            <a href="#" className="nav_logo">
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">Logo</span>
            </a>
            <div className="nav_list">
              <Link to={`/admin/home`}>
                <a className="nav_link active" onClick={handleLinkClick}>
                  <i className="bx bx-grid-alt nav_icon"></i>
                  <span className="nav_name">Home</span>
                </a>
              </Link>
              <Link to={`/admin/usermanagement`}>
                <a href="#" className="nav_link" onClick={handleLinkClick}>
                  <i className="bx bx-user nav_icon"></i>
                  <span className="nav_name">Quản lý người dùng</span>
                </a>
              </Link>
              <Link to={`/admin/authormanagement`}>
                <a href="#" className="nav_link" onClick={handleLinkClick}>
                  <i className="bx bx-message-square-detail nav_icon"></i>
                  <span className="nav_name">Quản lý tác giả</span>
                </a>
              </Link>
              <Link to={`/admin/billmanagement`}>
                <a className="nav_link" onClick={handleLinkClick}>
                  <i className="bx bx-bookmark nav_icon"></i>
                  <span className="nav_name">Quản lý bill</span>
                </a>
              </Link>
              <Link to={`/admin/movielistmanagement`}>
                <a className="nav_link" onClick={handleLinkClick}>
                  <i className="bx bx-folder nav_icon"></i>
                  <span className="nav_name">Quản lý listmovie</span>
                </a>
              </Link>

              <Link to={`/admin/categorymanagement`}>
                <a className="nav_link" onClick={handleLinkClick}>
                  <i className="bx bx-folder nav_icon"></i>
                  <span className="nav_name">Quản lý thể loại</span>
                </a>
              </Link>
            </div>
          </div>
          <a href="#" className="nav_link">
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
      <div
        className={`content-admin height-100 bg-light ${
          isSidebarOpen ? "body-content-pd" : ""
        }`}
      >
        <div className="ms-3">{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
