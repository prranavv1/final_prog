import React from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");   // 🔥 DEFINE ROLE HERE

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

  {/* WORK → everyone can see */}
  <li className="dropdown">
    Work
    <ul className="dropdown-menu">
      <li onClick={() => navigate("/new-job")}>New Job</li>
      <li onClick={() => navigate("/update-job")}>Update Job</li>
      <li onClick={() => navigate("/current-engagements")}>Current Engagements</li>
    </ul>
  </li>

  {/* ASSETS → only SENIOR_ENGINEER */}
  {(role === "SENIOR_ENGINEER" || role === "ADMIN") && (
  <li className="dropdown">
    Assets
    <ul className="dropdown-menu">
      <li onClick={() => navigate("/asset-summary")}>Asset Summary</li>
    </ul>
  </li>
)}


  {/* FINANCE → only ADMIN (optional, if you want) */}
  {role === "ADMIN" && (
    <li className="dropdown">
      Finance
      <ul className="dropdown-menu">
        <li onClick={() => navigate("/job-financials")}>Job Financials</li>
        <li onClick={() => navigate("/job-expenses")}>Job Expenses</li>
        <li onClick={() => navigate("/accounts-receivable")}>Accounts Receivable</li>
        <li onClick={() => navigate("/pending-invoices")}>Pending Invoice</li>
      </ul>
    </li>
  )}

  {/* REPORTS → only ADMIN (optional) */}
  {role === "ADMIN" && (
    <li className="dropdown">
      Reports
      <ul className="dropdown-menu">
        <li onClick={() => navigate("/job-summary")}>Job Summary</li>
        <li onClick={() => navigate("/asset-summary")}>Asset Summary</li>
        <li onClick={() => navigate("/payment-summary")}>Payment Summary</li>
      </ul>
    </li>
  )}

  {/* ADMIN → SENIOR + JUNIOR + ADMIN */}
  {(role === "ADMIN" || role === "SENIOR_ENGINEER" || role === "JUNIOR_ENGINEER") && (
    <li className="dropdown">
      Admin
      <ul className="dropdown-menu">
        {role === "ADMIN" && (
          <>
            <li onClick={() => navigate("/manage-users")}>Manage Users</li>
            <li onClick={() => navigate("/add-user")}>Add User</li>
          </>
        )}
        {(role === "SENIOR_ENGINEER" || role === "JUNIOR_ENGINEER") && (
          <li onClick={() => navigate("/profile")}>My Profile</li>
        )}
      </ul>
    </li>
  )}

</ul>





      {/* RIGHT */}
      <div className="navbar-right">
        <span className="username">{username || "User"}</span>
        <button className="logout-btn" onClick={handleLogout}>⏻</button>
      </div>
    </div>
  );
}

export default Navbar;
