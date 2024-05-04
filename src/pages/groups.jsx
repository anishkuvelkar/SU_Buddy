import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../images/su.jpg';
import GroupCard from '../components/GroupCard'; // Ensure the path to GroupCard is correct

const Groups = () => {
    const departments = [
        'College of Arts and Sciences',
        'College of Engineering and Computer Science',
        'College of Visual and Performing Arts',
        'David B. Falk College of Sport and Human Dynamics',
        'Martin J. Whitman School of Management',
        'Maxwell School of Citizenship and Public Affairs',
        'S.I. Newhouse School of Public Communications',
        'School of Education',
        'School of Information Studies'
    ];

    const branches = {
        'College of Arts and Sciences': ['Biology', 'Chemistry', 'Physics'],
        'College of Engineering and Computer Science': ['Computer Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
        'College of Visual and Performing Arts': ['Art', 'Music', 'Theater'],
        'David B. Falk College of Sport and Human Dynamics': ['Sports Management', 'Nutrition Science', 'Social Work'],
        'Martin J. Whitman School of Management': ['Finance', 'Marketing', 'Entrepreneurship'],
        'Maxwell School of Citizenship and Public Affairs': ['Political Science', 'Public Administration', 'International Relations'],
        'S.I. Newhouse School of Public Communications': ['Journalism', 'Television', 'Public Relations'],
        'School of Education': ['Curriculum and Teaching', 'Educational Leadership', 'Instructional Design'],
        'School of Information Studies': ['Information Technology', 'Data Science', 'Cybersecurity']
    };

    const clubs = [
        'Cage works',
        'Badminton Club',
        'Boxing',
        'Cricket',
        'Swimming',
        'eSports at Syracuse University',
        'Hacking',
        "Men's Basketball",
        "Women's Basketball",
        "Volleyball"
    ];

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [filter, setFilter] = useState({
        department: '',
        branch: '',
        club: ''
    });

    useEffect(() => {
        // Simulating fetching data
        setIsLoaded(true); // Assume data is loaded immediately for this example
    }, []);

    const handleSearch = () => {
        if (filter.club) {
            // If a club is selected, set selected info for the club
            setSelectedInfo({
                name: filter.club,
                imageUrl: '..SU_Buddy\src\images\slider1.jpg',  // Placeholder, replace with actual path
                link: '/path/to/club/chat'            // Placeholder, replace dynamically
            });
        } else if (filter.department && filter.branch) {
            // If a department and branch are selected, set selected info
            const groupName = `${filter.department} - ${filter.branch}`;
            setSelectedInfo({
                name: groupName,
                imageUrl: '..SU_Buddy\src\images\slider1.jpg',  // Placeholder, replace with actual path
                link: '/path/to/group/chat'            // Placeholder, replace dynamically
            });
        } else {
            alert("Please select a club or both a department and a branch!");
            return;
        }
    };

    return (
        <section className="relative min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${backgroundImage})`, filter: 'brightness(80%)' }}>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                    {/* Department Dropdown */}
                    <div className="w-full md:w-1/4">
                        <select
                            value={filter.department}
                            onChange={(e) => setFilter({ ...filter, department: e.target.value, branch: '' })}
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

                    {/* Branch Dropdown */}
                    {filter.department && (
                        <div className="w-full md:w-1/4">
                            <select
                                value={filter.branch}
                                onChange={(e) => setFilter({ ...filter, branch: e.target.value })}
                                className="p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="">Select Branch</option>
                                {branches[filter.department].map((branch, index) => (
                                    <option key={index} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Club Dropdown */}
                    <div className="w-full md:w-1/4">
                        <select
                            value={filter.club}
                            onChange={(e) => setFilter({ ...filter, club: e.target.value })}
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="">Select Club</option>
                            {clubs.map((club, index) => (
                                <option key={index} value={club}>
                                    {club}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
                    >
                        View
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-12">
                {error ? (
                    <div className="text-red-500 text-center py-4">Error: {error}</div>
                ) : !isLoaded ? (
                    <div className="text-center py-4">Loading...</div>
                ) : selectedInfo ? (
                    <GroupCard
                        name={selectedInfo.name}
                        imageUrl={selectedInfo.imageUrl}
                        link={selectedInfo.link}
                    />
                ) : (
<div className="container mx-auto px-4 pt-12 flex justify-center items-center h-full">
    <div className="inline-block bg-white text-gray-800 text-center py-2 px-4 rounded-lg shadow">
        Select a club or both a department and branch, then press "View" to see the group info.
    </div>
</div>
                )}
            </div>
        </section>
    );
};

export default Groups;
