import React, { useState } from 'react';
 

function Signup() {
  // State hooks for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/signup', {
        username,
        password,
        Email: email,
        role
      });
      console.log(response.data); 
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  return (
    <div className=' mt-40'>

      <h1 className="text-5xl mb-10 text-center text-gray-100">Signup</h1>
      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border border-white text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border border-white text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border border-white text-white"
        />
         <div className="block mx-auto w-1/3 py-2 px-4 rounded-md mb-4 bg-transparent border border-white text-white">
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
        <button type="submit" className="py-2 px-4 bg-white text-black rounded-md">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
