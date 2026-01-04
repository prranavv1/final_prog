import { useState } from "react";
import axios from "axios";

function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async () => {
    await axios.post("http://localhost:8000/auth/signup", {
      username,
      password
    });
    alert("User created successfully");
  };

  return (
    <div>
      <h2>Add User</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleAddUser}>Save</button>
    </div>
  );
}

export default AddUser;
