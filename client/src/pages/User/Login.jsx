 
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8008/user/login', {
 
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signinStart,
  signinSuccess,
  signinFail,
} from "../../redux/user/userSlice.js";
import { Button } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

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

      dispatch(
        signinSuccess({
          user,
        })
      );

      // Save token to local storage
      localStorage.setItem("token", token);

 
      console.log(response.data); 
      navigate('/StudentDashboard');
 
      console.log(response.data);
 
    } catch (error) {
      console.error("Error Login:", error.message);
    }
  };

  return (
    <div className="h-[1000px] text-slate-700">
      <h1 className="mt-40 text-4xl text-center">Login</h1>
      <form onSubmit={handleSubmit} className="mt-10 text-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="py-2 px-4 w-1/4 bg-transparent border rounded-md mb-4"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 px-4   w-1/4 bg-transparent border rounded-md mb-4"
        />
        <br></br>
        <Button
          variant="outlined"
          type="submit"
          className="py-2 px-4 bg-white text-black rounded-md"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}

export default Login;
