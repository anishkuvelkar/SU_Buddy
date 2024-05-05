import React, { useState, useEffect } from 'react';
import img3 from '../images/backgroundhome.jpg';
import useTypewriter from 'react-typewriter-hook';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [text, setText] = useState('');
  const phrases = ["SU BUDDY", "YOUR FRIEND ABROAD", "YOUR BUDDY FOR SUCCESS"];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setText(randomPhrase);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useTypewriter(text, {
    setText: setText, 
    loop: true,
    delay: 50,
    deleteSpeed: 50,
  });

  return (
    <div 
      style={{ 
        backgroundImage: `url(${img3})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', 
        filter: 'brightness(90%)',
      }}
    >
      <div style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: '20%',
        padding: '35px', // Use padding to create space inside the box
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px', // Max width for readability
        width: '90%', // Responsive width
        margin: '0 auto', // Center the div
      }}>
        <p style={{ color: 'white', padding: '35px', textAlign: 'center' }}>
          Hey there! I'm your Syracuse Buddy, and I'm thrilled to be by your side as you navigate your journey as an international student. Studying abroad is an incredible adventure filled with new experiences and challenges, and I'm here to support you every step of the way.

          At SU Buddy, our goal is to provide you with a platform where you can connect with other students, share stories, and form meaningful connections. Whether you're looking for a study partner, seeking advice on adjusting to a new culture, or simply want someone to chat with, I've got your back.

          Together, let's embrace this exciting journey and make the most of our time here at Syracuse University. From exploring campus to immersing ourselves in new cultures, there's so much to discover and experience.

          So, welcome to our vibrant community! With SU Buddy, you're never alone. Let's embark on this adventure together and create memories that will last a lifetime.
        </p>
        <div style={{ textAlign: 'center', position: 'relative', top: '-20px' }}>
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" style={{ marginRight: '20px' }}>Login</button>
          </Link>
          <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Register</button>
          </Link>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '20px', textAlign: 'center', width: '100%' }}>
        <h1 style={{ color: 'darkorange', fontSize: '48px', fontWeight: 'bold', textShadow: '2px 2px 0 black' }}>
          <span style={{ borderBottom: '2px solid darkorange', animation: 'blink 0.8s infinite' }}></span>
        </h1>
      </div>
    </div>
  );
};

export default Landing;