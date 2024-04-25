import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});  // User state to store all user data
  const [isLoading, setIsLoading] = useState(true);  // State to handle loading status

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/user');  // Fetch user data
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message || 'Error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;  // Display a loading message while data is being fetched
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <img src={user.imageUrl || '/default-profile.png'} alt="Profile" className="w-32 h-32 rounded-full" />
        <h1 className="text-lg font-bold mt-2">{user.name}</h1>
        <p>{user.about}</p>
        <div className="mt-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Graduation Year:</strong> {user.graduationYear}</p>
          <p><strong>Country:</strong> {user.country}</p>
          {/* Add more fields as necessary */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
