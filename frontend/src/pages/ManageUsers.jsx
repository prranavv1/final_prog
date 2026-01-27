import React from "react";
import "../styles/ManageUsers.css";

function ManageUsers() {
  const users = [
    {
      id: "EMP-001",
      name: "John Reynolds",
      email: "j.reynolds@prognosys.com",
      role: "Senior Engineer",
      status: "Active",
    },
    {
      id: "EMP-004",
      name: "Sarah Patel",
      email: "s.patel@prognosys.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: "EMP-012",
      name: "Mike Al-Fayed",
      email: "m.fayed@prognosys.com",
      role: "Junior Engineer",
      status: "Inactive",
    },
  ];

  return (
    <div className="mu-page">
      {/* Grey Header */}
      <div className="mu-header">
        <h2>MANAGE USERS</h2>
        <p>Manage and track your engineering workflows.</p>
      </div>

      {/* White Card */}
      <div className="mu-card">
        <div className="mu-card-header">
          <div>
            <h3>USER DIRECTORY</h3>
            <p>Manage access and roles.</p>
          </div>
        </div>

        {/* Table */}
        <div className="mu-table">
          <div className="mu-table-header">
            <span>USER ID</span>
            <span>NAME</span>
            <span>EMAIL</span>
            <span>ROLE</span>
            <span>STATUS</span>
            <span>ACTION</span>
          </div>

          {users.map((u, i) => (
            <div className="mu-row" key={i}>
              <span className="mu-id">{u.id}</span>
              <span className="mu-name">{u.name}</span>
              <span>{u.email}</span>
              <span>{u.role}</span>
              <span>
                <span
                  className={`mu-status ${
                    u.status === "Active" ? "active" : "inactive"
                  }`}
                >
                  {u.status}
                </span>
              </span>
              <span className="mu-actions">
                ✏️ 🗑️
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
