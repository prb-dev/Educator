import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:80/user/signup", {
        username,
        password,
        Email: email,
        role,
      });

      console.log(response.data);

      // Redirect to the login page
      navigate("/");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(
          `Server responded with status ${error.response.status}`
        );
        console.error("Error signing up:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response received from the server");
        console.error("Error signing up:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("Error setting up the request");
        console.error("Error signing up:", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-blue-900">
      <h1 className="text-5xl mb-10">Signup</h1>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field p-1 bg-gray-100 pl-10 pr-10 mb-4 rounded-lg border border-gray-500"
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field p-1 bg-gray-100 pl-10 pr-10 mb-4 rounded-lg border border-gray-500"
        />
        <br></br>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field p-1 bg-gray-100 pl-10 pr-10 mb-4 rounded-lg border border-gray-500"
        />
        <br></br>
        <div className="flex   items-center mb-4" >
          <label className="mr-4 p-2">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
              className="mr-1"
            />
            Student
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="role"
              value="lecturer"
              checked={role === "lecturer"}
              onChange={() => setRole("lecturer")}
              className="mr-1"
            />
            Lecturer
          </label>
        </div>
        <Button variant="contained" type="submit" className="button mb-4">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
