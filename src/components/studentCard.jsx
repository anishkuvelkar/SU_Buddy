import React from 'react';
const StudentCard = ({ title, imageFilename, department, graduationYear, email }) => {
  // Function to generate Teams URL using email
  const generateTeamsUrlWithEmail = (email) => {
    return `https://teams.microsoft.com/l/chat/0/0?users=${email}`;
};
    return (
      <div className="max-w-xs mx-auto bg-blue-900 bg-opacity-90 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
        {/* Image container */}
        <div className="flex justify-center pt-6">
          <img src={imageFilename} alt={`Profile of ${title}`} className="rounded-full h-32 w-32 object-cover" />
        </div>
        {/* Content container */}
        <div className="p-6 text-center text-white">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p>{department}</p>
          <p className="mb-4">Class of {graduationYear}</p>
          {/* Chat button */}
          <div className="text-center">
            <button
             onClick={() => window.open(generateTeamsUrlWithEmail(email), '_blank')}
             className="bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
             Chat with {title}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default StudentCard;