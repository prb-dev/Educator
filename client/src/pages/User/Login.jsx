import React, { useState } from 'react';
import axios from 'axios';
 

function Login() {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);

  };

  return (
    <div className='h-[1000px] '>
      <h1 className="mt-40 text-4xl text-center">Login</h1>
      <form onSubmit={handleSubmit} className="mt-10 text-center">
         
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="py-2 px-4 w-1/4 bg-transparent border rounded-md mb-4"
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 px-4   w-1/4 bg-transparent border  text-white rounded-md mb-4"
        />
        <br></br>
        <button type="submit" className="py-2 px-4 bg-white text-black rounded-md">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;