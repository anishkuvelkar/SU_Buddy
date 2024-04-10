import React from 'react';

const Card = ({ title, image, text }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition-opacity duration-300"
        style={{ opacity: '1' }} 
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
        <div className="text-center text-white p-4">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
