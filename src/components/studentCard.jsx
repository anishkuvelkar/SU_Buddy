import React from 'react';

const StudentCard = ({ title, image, text, onChat, department, graduationYear }) => {
    // Syracuse University blue with a bit of opacity
    const suBlue = { backgroundColor: 'rgba(29, 41, 84, 0.9)' };

    return (
        <div className="rounded-xl shadow-lg overflow-hidden text-white bg-blue-900 bg-opacity-90 hover:bg-opacity-100 transition duration-300">
            <div className="relative w-full h-48">
                <img src={image} alt={title} className="absolute w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p>{department}</p>
                    <p>Class of {graduationYear}</p>
                </div>
                <div className="mt-4">
                    <button
                        onClick={onChat}
                        className="bg-white text-blue-700 font-bold py-2 px-4 rounded hover:bg-blue-200 transition duration-300 mx-auto"
                    >
                        Chat with {title}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default StudentCard;
