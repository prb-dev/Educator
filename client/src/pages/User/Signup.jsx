import React, { useState } from 'react';
import axios from 'axios';
 
import { useNavigate } from 'react-router-dom';
 
import { Button } from '@mui/material';
 

function Signup() {
  // State hooks for form inputs
 
  const [username, setUsername] 
  = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
 
      const response = await axios.post('http://localhost:8008/user/signup', {
 
      const response = await axios.post('http://localhost:80/user/signup', {
 
        username,
        password,
        Email: email,
        role
      });
      console.log(response.data); 
// Redirect to the login page
navigate('/StudentDashboard');
 
if (redirect) {
return <Redirect to="/student-dashboard" />; // Redirect if redirect is true
}



    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(`Server responded with status ${error.response.status}`);
        console.error('Error signing up:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response received from the server');
        console.error('Error signing up:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('Error setting up the request');
        console.error('Error signing up:', error.message);
      }
    }
  };

 
    <div className=' mt-40 h-[1000px]'>
 
    <div className=' mt-40 h-[1000px] text-slate-700'>

 
      <h1 className="text-5xl mb-10 text-center ">Signup</h1>
      <form onSubmit={handleSubmit} className="text-center">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border text-black"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border text-black"
        />
        <div className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border border-white text">
          <label className="mr-4">
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
              className="mr-1"
            />
            Student
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="role"
              value="lecturer"
              checked={role === 'lecturer'}
              onChange={() => setRole('lecturer')}
              className="mr-1"
            />
            Lecturer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="mr-1"
            />
            Admin
          </label>
        </div>
        <Button variant='outlined' type="submit" className="py-2 px-4 bg-white text-black rounded-md">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
