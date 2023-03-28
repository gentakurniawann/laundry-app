import React, { useState } from "react";
import Media from "../media";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    localStorage.clear();
    window.location = "/login";
  };
  const menuItem = [
    {
      path: "/dashboard_admin",
      name: "Dashboard",
      icon: <Media value image="icon-dashboard.svg" alt="icon-dashboard.svg" />,
    },
    {
      path: "/package",
      name: "Package",
      icon: <Media value image="icon-package.svg" alt="icon-package.svg" />,
    },
    {
      path: "/cashier",
      name: "Cashier",
      icon: <Media value image="icon-cashier.svg" alt="icon-cashier.svg" />,
    },
    {
      path: "/customer",
      name: "Customer",
      icon: <Media value image="icon-customer.svg" alt="icon-customer.svg" />,
    },
    {
      path: "/transaction",
      name: "Transaction",
      icon: (
        <Media value image="icon-transaction.svg" alt="icon-transation.svg" />
      ),
    },
  ];
  return (
    <div style={{ width: isOpen ? "240px" : "80px" }} className="sidebar">
      <div
        className="header d-flex align-items-center"
        style={{
          padding: isOpen ? "20px 16px 0 16px" : "20px 20px 0 20px",
        }}
      >
        <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
          <Media
            value
            image="logo-white.png"
            alt="logo-white.png"
            width="157px"
            height="40px"
          />
        </div>
        <div className="bars" onClick={toggle}>
          <Media value image="icon-menu.svg" alt="icon-menu.svg" />
        </div>
      </div>
      <div className="sidebar-content">
        {menuItem.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="link d-flex align-items-center"
          >
            <div className="icon">{item.icon}</div>
            <div
              className="link_text"
              style={{
                display: isOpen ? "block" : "none",
              }}
            >
              {item.name}
            </div>
          </Link>
        ))}
        <div className="logout" style={{ width: isOpen ? "240px" : "80px" }}>
          <div
            className="logout-button d-flex align-items-center"
            onClick={logout}
          >
            <Media value image="icon-logout.svg" alt="icon-logout.svg" />
            <p style={{ display: isOpen ? "block" : "none" }}>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
