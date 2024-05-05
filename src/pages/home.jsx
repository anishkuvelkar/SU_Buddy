import StudentCard from '../components/studentCard';
import React, { useState, useEffect, useContext  } from 'react';
import backgroundImage from '../images/su.jpg'
import axios from 'axios';
const HomePage = () => {
    // Decode token to get user info
    const token = localStorage.getItem('token');
    const currentUser = token ? parseJwt(token) : null;
    console.log("Current User Email:", currentUser?.email);
    
    function parseJwt(token) {
    try {
        console.log("Original Token:", token);
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        console.log("Decoded Base64 URL:", window.atob(base64)); // See what's decoded before URI processing
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        console.log("JSON Payload:", jsonPayload); // Log the actual JSON string
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Failed to decode JWT:", e);
        return null;
    }
}

    

    const graduationYears = Array.from({ length: 150 }, (_, index) => 1900 + index);  // Array of years from 2020 to 2030
    const departments = ['College of Arts and Sciences',
        'College of Engineering and Computer Science',
        'College of Visual and Performing Arts',
        'David B. Falk College of Sport and Human Dynamics',
        'Martin J. Whitman School of Management',
        'Maxwell School of Citizenship and Public Affairs',
        'S.I. Newhouse School of Public Communications',
        'School of Education',
        'School of Information Studies'];

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [studentName, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState({
        graduationYear: '',
        department: '',
        country: ''
    });


    useEffect(() => {
        fetchData();
    },[currentUser?.email]);
   /* const fetchData = async () => {
        
        try {
            const response = await axios.get('/users');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            
            const updatedItems = response.data.filter(userItem => user && userItem.email !== user.email).map(user => ({
                
                ...user,
                imageUrl: user.image // Adjust the URL as needed
                
            }));
            setItems( updatedItems); // Example if you get a single image
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoaded(true);
        }
    };*/
    const fetchData = async () => {
        setIsLoaded(false);
    
        const token = localStorage.getItem('token');
        const currentUser = token ? parseJwt(token) : null;
    
        console.log("Current User ID from JWT:", currentUser?.userId);
    
        try {
            const response = await axios.get('/users');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            
            console.log("Users fetched from API:", response.data);
    
            const updatedItems = response.data.filter(userItem => {
                console.log("Comparing API user ID:", userItem._id, "with JWT ID:", currentUser?.userId);
                return currentUser && userItem._id !== currentUser.userId;
            }).map(user => ({
                ...user,
                imageUrl: user.image
            }));
    
            console.log("Filtered Items:", updatedItems);
            setItems(updatedItems);
        } catch (err) {
            setError(err.message);
            console.error("Error during fetch or processing:", err);
        } finally {
            setIsLoaded(true);
        }
    };
    

    const handleSearch = async () => {
        setIsLoaded(false);
    
        const token = localStorage.getItem('token');
        const currentUser = token ? parseJwt(token) : null;
    
        console.log("Current User ID from JWT:", currentUser?.userId);
    
        try {
            const params = {
                name: studentName,
                graduationYear: filter.graduationYear,
                department: filter.department,
            };
            const response = await axios.get('/users/search', { params });
            const searchupdatedItems = response.data.filter(userItem => {
                console.log("Comparing API user ID:", userItem._id, "with JWT ID:", currentUser?.userId);
                return currentUser && userItem._id !== currentUser.userId;
            }).map(user => ({
                ...user,
                imageUrl: user.image
            }));
            setItems(searchupdatedItems);
            setIsLoaded(true);
        } catch (err) {
            setError(err.message);
            setIsLoaded(true);
        }
        finally {
            setIsLoaded(true);
            // Reset search fields after the search
            setSearch('');
            setFilter({
                graduationYear: '',
                department: '',
                country: ''
            });
        };
    }
    console.log(items);
        return (
            <section className="relative min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(80%)' }}>
                <div className="container mx-auto p-4">
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={studentName}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full md:w-1/3"
                        />

                        {/* Graduation Year Dropdown */}
                        <div className="w-full md:w-1/4">
                            <select
                                value={filter.graduationYear}
                                onChange={(e) => setFilter({ ...filter, graduationYear: e.target.value })}
                                className="p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="">Select Graduation Year</option>
                                {graduationYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Department Dropdown */}
                        <div className="w-full md:w-1/4">
                            <select
                                value={filter.department}
                                onChange={(e) => setFilter({ ...filter, department: e.target.value })}
                                className="p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept, index) => (
                                    <option key={index} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
                        >
                            Search
                        </button>


                    </div>

                </div>

                <div className="container mx-auto px-4 pt-12">
                    {error ? (
                        <div className="text-red-500 text-center py-4">Error: {error}</div>
                    ) : !isLoaded ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((item) => (
                                <StudentCard
                                    key={item._id}
                                    title={`${item.firstName} ${item.lastName}`}
                                    imageFilename={item.imageUrl}
                                    department={item.department}
                                    graduationYear={item.graduationYear}
                                    email={item.email}

                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    };
    export default HomePage;
