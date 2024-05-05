import React, { useState } from "react";
import backgroundImage from "../images/su.jpg";
import GroupCard from "../components/GroupCard"; // Ensure the path to GroupCard is correct

const Groups = () => {
  const departments = [
    "College of Arts and Sciences",
    "College of Engineering and Computer Science",
    "College of Visual and Performing Arts",
    "David B. Falk College of Sport and Human Dynamics",
    "Martin J. Whitman School of Management",
    "Maxwell School of Citizenship and Public Affairs",
    "S.I. Newhouse School of Public Communications",
    "School of Education",
    "School of Information Studies",
  ];

  const branches = {
    "College of Arts and Sciences": ["Biology", "Chemistry", "Physics"],
    "College of Engineering and Computer Science": [
      "Computer Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    "College of Visual and Performing Arts": ["Art", "Music", "Theater"],
    "David B. Falk College of Sport and Human Dynamics": [
      "Sports Management",
      "Nutrition Science",
      "Social Work",
    ],
    "Martin J. Whitman School of Management": [
      "Finance",
      "Marketing",
      "Entrepreneurship",
    ],
    "Maxwell School of Citizenship and Public Affairs": [
      "Political Science",
      "Public Administration",
      "International Relations",
    ],
    "S.I. Newhouse School of Public Communications": [
      "Journalism",
      "Television",
      "Public Relations",
    ],
    "School of Education": [
      "Curriculum and Teaching",
      "Educational Leadership",
      "Instructional Design",
    ],
    "School of Information Studies": [
      "Information Technology",
      "Data Science",
      "Cybersecurity",
    ],
  };

  const clubs = [
    "Cage works",
    "Badminton Club",
    "Boxing",
    "Cricket",
    "Swimming",
    "eSports at Syracuse University",
    "Hacking",
    "Men's Basketball",
    "Women's Basketball",
    "Volleyball",
  ];

  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");

  const handleAddCard = () => {
    let duplicateFound = false;
    let selectionsToClear = [];

    if (selectedDepartment && selectedBranches.length > 0) {
      selectedBranches.forEach((branch) => {
        const cardName = branch; // Only use branch name
        if (!selectedCards.some((card) => card.name === cardName)) {
          setSelectedCards((prev) => [
            ...prev,
            {
              name: cardName,
              imageUrl: "../images/su.jpg",
              link: "/path/to/group/chat",
            },
          ]);
        } else {
          alert(`Card for ${cardName} is already added.`);
          duplicateFound = true;
          selectionsToClear.push({
            department: selectedDepartment,
            branches: [branch],
          });
        }
      });
    }

    if (selectedClub) {
      if (!selectedCards.some((card) => card.name === selectedClub)) {
        setSelectedCards((prev) => [
          ...prev,
          {
            name: selectedClub,
            imageUrl: "../images/su.jpg",
            link: "/path/to/club/chat",
          },
        ]);
      } else {
        alert(`Card for ${selectedClub} is already added.`);
        duplicateFound = true;
        selectionsToClear.push({ club: selectedClub });
      }
    }

    if (selectionsToClear.length > 0) {
      selectionsToClear.forEach((selection) => {
        if (selection.department) {
          setSelectedDepartment("");
          setSelectedBranches([]);
        }
        if (selection.club) {
          setSelectedClub("");
        }
      });
    }

    if (
      !duplicateFound &&
      !selectedClub &&
      (selectedBranches.length === 0 || !selectedDepartment)
    ) {
      alert("Please select a club or both a department and branch!");
    }
  };

  const handleClear = () => {
    setSelectedCards([]);
    setSelectedDepartment("");
    setSelectedBranches([]);
    setSelectedClub("");
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        filter: "brightness(80%)",
      }}
    >
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          {/* Department Dropdown */}
          <div className="w-full md:w-1/4">
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setSelectedBranches([]);
              }}
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

          {/* Branch Multi-select Dropdown */}
          {selectedDepartment && (
            <div className="w-full md:w-1/4">
              <select
                multiple
                value={selectedBranches}
                onChange={(e) =>
                  setSelectedBranches(
                    [...e.target.selectedOptions].map((option) => option.value)
                  )
                }
                className="p-2 border border-gray-300 rounded w-full h-32 overflow-y-scroll"
              >
                {branches[selectedDepartment].map((branch, index) => (
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
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
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

          {/* Add Button */}
          <button
            onClick={handleAddCard}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto"
          >
            Add
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12">
        <div className="grid grid-cols-3 gap-4">
          {selectedCards.map((card, index) => (
            <GroupCard
              key={index}
              name={card.name}
              imageUrl={card.imageUrl}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Groups;
