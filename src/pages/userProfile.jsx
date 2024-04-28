import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BasicUser, Student, Alumni } from '../../server/oodprops/userClasses';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.user;
        let userInstance;
        if (userData.status === 'student') {
          userInstance = new Student(userData);
          console.log(userInstance)
        } else if (userData.status === 'alumni') {
          userInstance = new Alumni(userData);
        } else {
          userInstance = new BasicUser(userData);
        }
        setUser(userInstance);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render user profile based on status
  const renderProfileBasedOnStatus = () => {
    if (user && user.status === 'student') {
      return <StudentProfile user={user} />;
    } else if (user && user.status === 'alumni') {
      return <AlumniProfile user={user} />;
    } else {
      return <div>Unknown user status</div>;
    }
  };

  return (
    <div className="bg-orange-200 min-h-screen py-8">
      <div className="container mx-auto px-4">{renderProfileBasedOnStatus()}</div>
    </div>
  );
};

// Define StudentProfile component
const StudentProfile = ({ user }) => {
  return (
    <div className="bg-orange-200 min-h-screen py-8">
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg">
  <p className="text-lg">
    Welcome, student! It's great to have you here. Hello, student! Ready to embark on your academic journey? Hey there, student! Let's make this semester amazing together.
  </p>
</div>
</div>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500">
              <img src={`/images/${user.image || 'default-profile.png'}`} alt="Profile" className="w-32 h-32" />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-600">About me: {user.about}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-100 rounded-lg p-4 border border-gray-300 hover:bg-blue-200">
                <p className="font-semibold text-blue-800">Email</p>
                <p className="text-blue-600">{user.email}</p>
              </div>
              <div className="bg-green-100 rounded-lg p-4 border border-gray-300 hover:bg-green-200">
                <p className="font-semibold text-green-800">Department</p>
                <p className="text-green-600">{user.department}</p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 border border-gray-300 hover:bg-yellow-200">
                <p className="font-semibold text-yellow-800">Subject</p>
                <p className="text-yellow-600">{user.subject}</p>
              </div>
              <div className="bg-purple-100 rounded-lg p-4 border border-gray-300 hover:bg-purple-200">
                <p className="font-semibold text-purple-800">Status</p>
                <p className="text-purple-600">{user.status}</p>
              </div>
              <div className="bg-pink-100 rounded-lg p-4 border border-gray-300 hover:bg-pink-200">
                <p className="font-semibold text-pink-800">Date of Birth</p>
                <p className="text-pink-600">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
              </div>
              <div className="bg-indigo-100 rounded-lg p-4 border border-gray-300 hover:bg-indigo-200">
                <p className="font-semibold text-indigo-800">Gender</p>
                <p className="text-indigo-600">{user.gender}</p>
              </div>
              <div className="bg-red-100 rounded-lg p-4 border border-gray-300 hover:bg-red-200">
                <p className="font-semibold text-red-800">Country</p>
                <p className="text-red-600">{user.selectedCountry}</p>
              </div>
              <div className="bg-cyan-100 rounded-lg p-4 border border-gray-300 hover:bg-cyan-200">
                <p className="font-semibold text-cyan-800">About</p>
                <p className="text-cyan-600">{user.about}</p>
              </div>
              <div className="bg-teal-100 rounded-lg p-4 border border-gray-300 hover:bg-teal-200">
                <p className="font-semibold text-teal-800">Graduation Year</p>
                <p className="text-teal-600">{user.graduationYear}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};


// Define AlumniProfile component
const AlumniProfile = ({ user }) => {
  return (
    <div className="bg-orange-200 min-h-screen py-8">
    <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg">
<p className="text-lg">
Greetings, esteemed alumni! Welcome back to your alma mater. Hello, alumni! Your continued support means the world to us. Welcome back, alumni! Your success inspires us all.
</p>
</div>
</div>
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500">
            <img src={`/images/${user.image || 'default-profile.png'}`} alt="Profile" className="w-32 h-32" />
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-600">About me: {user.about}</p>
          </div>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 rounded-lg p-4 border border-gray-300 hover:bg-blue-200">
              <p className="font-semibold text-blue-800">Email</p>
              <p className="text-blue-600">{user.email}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4 border border-gray-300 hover:bg-green-200">
              <p className="font-semibold text-green-800">Department</p>
              <p className="text-green-600">{user.department}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 border border-gray-300 hover:bg-yellow-200">
              <p className="font-semibold text-yellow-800">Subject</p>
              <p className="text-yellow-600">{user.subject}</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-4 border border-gray-300 hover:bg-purple-200">
              <p className="font-semibold text-purple-800">Status</p>
              <p className="text-purple-600">{user.status}</p>
            </div>
            <div className="bg-pink-100 rounded-lg p-4 border border-gray-300 hover:bg-pink-200">
              <p className="font-semibold text-pink-800">Date of Birth</p>
              <p className="text-pink-600">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div className="bg-indigo-100 rounded-lg p-4 border border-gray-300 hover:bg-indigo-200">
              <p className="font-semibold text-indigo-800">Gender</p>
              <p className="text-indigo-600">{user.gender}</p>
            </div>
            <div className="bg-red-100 rounded-lg p-4 border border-gray-300 hover:bg-red-200">
              <p className="font-semibold text-red-800">Country</p>
              <p className="text-red-600">{user.selectedCountry}</p>
            </div>
            <div className="bg-cyan-100 rounded-lg p-4 border border-gray-300 hover:bg-cyan-200">
              <p className="font-semibold text-cyan-800">About</p>
              <p className="text-cyan-600">{user.about}</p>
            </div>
            <div className="bg-teal-100 rounded-lg p-4 border border-gray-300 hover:bg-teal-200">
              <p className="font-semibold text-teal-800">Graduation Year</p>
              <p className="text-teal-600">{user.graduationYear}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);  
};




export default UserProfile;
