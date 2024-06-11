import React, { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input type="text" required name="username" placeholder="Username" />
          <input type="email" required name="email" placeholder="Email" />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
          />
          {error && <span style={{ color: "red" }}>{error}!</span>}
          <button disabled={isLoading}>Register</button>
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.jpeg" alt="bg" />
      </div>
    </div>
  );
}

export default Register;
