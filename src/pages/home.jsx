import StudentCard from '../components/studentCard';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/su.jpg'
import axios from 'axios';

const HomePage = () => {
    const graduationYears = Array.from({ length: 11 }, (_, index) => 2020 + index);  // Array of years from 2020 to 2030
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
    const [filter, setFilter] = useState({
        graduationYear: '',
        department: '',
        country: ''
    });


    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('/users');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            setItems(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoaded(true);
        }
    };

    const handleSearch = async () => {
        setIsLoaded(false);
        try {
            const params = {
                name: studentName,
                graduationYear: filter.graduationYear,
                department: filter.department,
            };
            const response = await axios.get('/users/search', { params });
            setItems(response.data);
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
                                    title={item.firstName}
                                    image={item.imageUrl}
                                    department={item.department}
                                    graduationYear={item.graduationYear}

                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    };
    export default HomePage;