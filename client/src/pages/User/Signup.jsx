import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';


function Signup() {
  // State hooks for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:80/user/signup', {
        username,
        password,
        Email: email,
        role
      });
      console.log(response.data); 
    } catch (error) {
      console.error('Error signing up:', error.message);
    };
}
  return (
    <div className=' mt-40 h-[1000px] text-slate-700'>

      <h1 className="text-5xl mb-10 text-center ">Signup</h1>
      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border  text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border   text-black"
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
