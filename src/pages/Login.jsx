
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.get("/users");

      const loggedUser = response.data.find(
        (item) =>
          item.email.trim().toLowerCase() ===
            user.email.trim().toLowerCase() &&
          item.password === user.password
      );

      if (loggedUser) {
        localStorage.setItem("user", JSON.stringify(loggedUser));

        alert("Login Successful!");
        navigate("/");
        window.location.reload();
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.log("Login Error:", error);
      alert("Unable to connect to server");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
