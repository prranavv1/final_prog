import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";


function Navbar() {
  const username = localStorage.getItem("username");
const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <img src={logo} alt="Prognosys Logo" className="navbar-logo" />
      </div>

      {/* CENTER MENU */}
      <ul className="navbar-menu">
        <li className="dropdown">
  Work ▾
  <ul className="dropdown-menu">
    <li onClick={() => navigate("/new-job")}>New Job</li>
    <li onClick={() => navigate("/update-job")}>Update Job</li>
  </ul>
</li>


        <li className="dropdown">Assets ▾
          <ul className="dropdown-menu">
            <li>Asset Management</li>
          </ul>
        </li>

        <li className="dropdown">
  Finance ▾
  <ul className="dropdown-menu">
    <li onClick={() => navigate("/job-financials")}>Job Financials</li>
    <li onClick={() => navigate("/job-expenses")}>Job Expenses</li>
    <li onClick={() => navigate("/accounts-receivable")}>
  Accounts Receivable
</li>
<li onClick={() => navigate("/pending-invoice")}>
  Pending Invoice
</li>

  </ul>
</li>


        <li className="dropdown">Reports ▾
          <ul className="dropdown-menu">
            <li onClick={() => navigate("/job-details")}>Job Details</li>
            <li onClick={() => navigate("/job-summary")}>Job Summary</li>
            <li onClick={() => navigate("/payment-summary")}>Payment Summary</li>
            <li onClick={() => navigate("/asset-summary")}>Asset Summary</li>
          </ul>
        </li>

        <li className="dropdown">Admin ▾
          <ul className="dropdown-menu">
            <li>Add User</li>
            <li>Manage Access</li>
          </ul>
        </li>
      </ul>

      {/* RIGHT */}
      <div className="navbar-right">
        <span className="username">
          {username || "User"}
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          ⏻
        </button>
      </div>

    </div>
  );
}

export default Navbar;
