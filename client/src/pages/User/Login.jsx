import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signinStart, signinSuccess } from "../../redux/user/userSlice.js";
import { Button } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());

      const response = await axios.post("http://localhost:80/user/login", {
        username,
        password,
      });

      const token = response.data.token;
      const user = response.data.user;

      dispatch(signinSuccess({ user }));

      // Save token to local storage
      localStorage.setItem("token", token);

      console.log(response.data);
      navigate("/StudentDashboard");
    } catch (error) {
      console.error("Error Login:", error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-50 text-blue-500">
      <a className="text-5xl mb-12 font-bold">EDUCATOR</a>
      <h1 className="text-4xl mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="text-center rounded-lg">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field rounded-lg bg-gray-100 border border-gray-500 mb-4"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field rounded-lg bg-gray-100 border border-gray-500 mb-4"
        />
        <br />
        <Button
          variant="contained"
          type="submit"
          className="button bg-blue-500 text-white mb-4"
        >
          Log In
        </Button>
        <br />
        <Button>
          <a href="/Signup" className="text-blue-500">
            Sign up
          </a>
        </Button>
      </form>
    </div>
  );
}

export default Login;
