import { useState } from "react";
import axios from "axios";
import "../styles/AddUser.css";

function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:8000/auth/signup", {
        username,
        password,
      });
      alert("User created successfully");
      setUsername("");
      setPassword("");
    } catch (err) {
      alert("Failed to create user");
    }
  };

  return (
    <div className="au-page">

      {/* Grey Header */}
      <div className="au-header">
        <h2>ADD USERS</h2>
        <p>Manage and track your engineering workflows.</p>
      </div>

      {/* White Main Card */}
      <div className="au-card">
        <div className="au-card-header">
          <div>
            <h3>ADD NEW USER</h3>
            <p>Create credentials for system access.</p>
          </div>
          <div className="au-actions">
            <button className="au-cancel">Cancel</button>
            <button className="au-save" onClick={handleAddUser}>
              Save User
            </button>
          </div>
        </div>

        {/* Form Box */}
        <div className="au-form-box">
          <div className="au-field">
            <label>USERNAME *</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="au-field">
            <label>PASSWORD *</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default AddUser;
