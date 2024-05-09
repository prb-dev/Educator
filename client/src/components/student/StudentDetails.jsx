import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        const response = await axios.get(`/api/getUserDetailsByUID/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return null;

  const { username, email, password } = userData;

  return (
    <div>
      <h2>User Information</h2>
      <div>
        <strong>Username:</strong> {username}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <div>
        <strong>Password:</strong> {password}
      </div>
    </div>
  );
};

export default UserDetails;
