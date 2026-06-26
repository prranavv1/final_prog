import { useState } from "react";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleNavClick = (path) => {
    navigate(path);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="navbar">
      {/* LEFT - Logo */}
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" onClick={() => navigate("/home")} />
      </div>

      {/* CENTER - Horizontal Menu Items */}
      <div className="navbar-center">
        <div className="horizontal-menu">
          
          {/* Work Menu */}
          <div 
            className="menu-item-container"
            onMouseEnter={() => handleMouseEnter('work')}
            onMouseLeave={handleMouseLeave}
          >
            <div className="menu-item-header">
              <span className="menu-item-icon">💼</span>
              <span className="menu-item-title">Work</span>
            </div>
            
            {activeDropdown === 'work' && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => handleNavClick("/new-job")}>
                  <span className="dropdown-icon">➕</span>
                  <div className="dropdown-content">
                    <div className="dropdown-title">New Job</div>
                    <div className="dropdown-desc">Create new job entry</div>
                  </div>
                </div>
                <div className="dropdown-item" onClick={() => handleNavClick("/update-job")}>
                  <span className="dropdown-icon">✏️</span>
                  <div className="dropdown-content">
                    <div className="dropdown-title">Update Job</div>
                    <div className="dropdown-desc">Edit job details</div>
                  </div>
                </div>
                <div className="dropdown-item" onClick={() => handleNavClick("/current-engagements")}>
                  <span className="dropdown-icon">📋</span>
                  <div className="dropdown-content">
                    <div className="dropdown-title">Current Engagements</div>
                    <div className="dropdown-desc">View active jobs</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Assets Menu */}
          {(role === "SENIOR_ENGINEER" || role === "ADMIN") && (
            <div 
              className="menu-item-container"
              onMouseEnter={() => handleMouseEnter('assets')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="menu-item-header">
                <span className="menu-item-icon">📦</span>
                <span className="menu-item-title">Assets</span>
              </div>
              
              {activeDropdown === 'assets' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick("/asset-summary")}>
                    <span className="dropdown-icon">📊</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Asset Summary</div>
                      <div className="dropdown-desc">View all assets</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Finance Menu */}
          {role === "ADMIN" && (
            <div 
              className="menu-item-container"
              onMouseEnter={() => handleMouseEnter('finance')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="menu-item-header">
                <span className="menu-item-icon">💰</span>
                <span className="menu-item-title">Finance</span>
              </div>
              
              {activeDropdown === 'finance' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick("/job-financials")}>
                    <span className="dropdown-icon">💵</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Job Financials</div>
                      <div className="dropdown-desc">Manage job finances</div>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick("/job-expenses")}>
                    <span className="dropdown-icon">🧾</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Job Expenses</div>
                      <div className="dropdown-desc">Track expenses</div>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick("/accounts-receivable")}>
                    <span className="dropdown-icon">📥</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Accounts Receivable</div>
                      <div className="dropdown-desc">Manage receivables</div>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick("/pending-invoices")}>
                    <span className="dropdown-icon">⏳</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Pending Invoices</div>
                      <div className="dropdown-desc">View pending payments</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reports Menu */}
          {role === "ADMIN" && (
            <div 
              className="menu-item-container"
              onMouseEnter={() => handleMouseEnter('reports')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="menu-item-header">
                <span className="menu-item-icon">📈</span>
                <span className="menu-item-title">Reports</span>
              </div>
              
              {activeDropdown === 'reports' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavClick("/job-summary")}>
                    <span className="dropdown-icon">📑</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Job Summary</div>
                      <div className="dropdown-desc">View job statistics</div>
                    </div>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavClick("/payment-summary")}>
                    <span className="dropdown-icon">💳</span>
                    <div className="dropdown-content">
                      <div className="dropdown-title">Payment Summary</div>
                      <div className="dropdown-desc">View payment reports</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Admin Menu */}
          {(role === "ADMIN" || role === "SENIOR_ENGINEER" || role === "JUNIOR_ENGINEER") && (
            <div 
              className="menu-item-container"
              onMouseEnter={() => handleMouseEnter('admin')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="menu-item-header">
                <span className="menu-item-icon">⚙️</span>
                <span className="menu-item-title">Admin</span>
              </div>
              
              {activeDropdown === 'admin' && (
                <div className="dropdown-menu">
                  {role === "ADMIN" && (
                    <>
                      <div className="dropdown-item" onClick={() => handleNavClick("/manage-users")}>
                        <span className="dropdown-icon">👥</span>
                        <div className="dropdown-content">
                          <div className="dropdown-title">Manage Users</div>
                          <div className="dropdown-desc">User management</div>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={() => handleNavClick("/add-user")}>
                        <span className="dropdown-icon">➕</span>
                        <div className="dropdown-content">
                          <div className="dropdown-title">Add User</div>
                          <div className="dropdown-desc">Create new user</div>
                        </div>
                      </div>
                    </>
                  )}
                  {(role === "SENIOR_ENGINEER" || role === "JUNIOR_ENGINEER") && (
                    <div className="dropdown-item" onClick={() => handleNavClick("/profile")}>
                      <span className="dropdown-icon">👤</span>
                      <div className="dropdown-content">
                        <div className="dropdown-title">My Profile</div>
                        <div className="dropdown-desc">View your profile</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* RIGHT - User Profile */}
      <div className="navbar-right">
        <div className="user-profile">
          <div className="user-avatar">{username ? username.charAt(0).toUpperCase() : "U"}</div>
          <span className="username">{username || "User"}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <span className="logout-icon">⏻</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
