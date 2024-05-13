import React, { useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";

function UpdateUserDetails() {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
  });
  const [changesPending, setChangesPending] = useState(false); // State to track pending changes

  console.log(user.user._id)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:80/user/UpdateuserByID/${user.user._id}`, formData);
      console.log(response.data);
      setChangesPending(true); // Set changes pending flag to true upon successful submission
    } catch (error) {
      console.error("Error updating user details:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
        <div className="text-xl p-5"> 
      {changesPending && <div>Changes will appear in the next login</div>}
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline border-blue-500"
          >
            <option value="">Select Role</option>
            
            <option value="student">Student</option>
            
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update User</button>
      </form>
    </div>
  );
}

export default UpdateUserDetails;
