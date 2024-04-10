import React from 'react';
import Card from '../components/cards'; 
import backgroundImage from '../images/aboutbackground.jpg'; // Import your background image
import img4 from '../images/goal.jpg'; 
import img5 from '../images/mission.jpg'; 
import img6 from '../images/vision.jpg';
import img7 from '../images/community.png'; 
import img8 from '../images/career.png'; 
import img9 from '../images/book.jpg';  

const About = () => {
  return (
    <section className="py-16 bg-cover bg-center" style={{backgroundImage: `url(${backgroundImage})`, height: '100vh', filter: 'brightness(80%)'}}>
      <div className="container mx-auto px-4 pt-12"> {/* Add additional padding to the top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Our Goals"
            image={img4}
            text="SU Buddy is built on the core values of inclusivity, diversity, integrity, and excellence. We are committed to upholding these values in all aspects of our work, ensuring that every student feels valued, supported, and empowered to succeed."
          />
          <Card
            title="Our Mission"
            image={img5}
            text="At SU Buddy, our mission is to provide exceptional support and assistance to international students at Syracuse University. We strive to create a welcoming and inclusive community where students can thrive academically and personally."
          />
           <Card
            title="Our Vision"
            image={img6}
            text="Our vision is to be the go-to resource for international students, offering a wide range of services and programs to enhance their experience at Syracuse University. We aim to foster a sense of belonging and connectedness among students from diverse backgrounds."
          />
          <Card
            title="Community Engagement"
            image={img7}
            text="SU Buddy actively engages with the wider university community to foster collaboration, cultural exchange, and mutual understanding."
          />
          <Card
            title="Facilitate Career Development"
            image={img8}
            text="We aim to equip students with the connections necessary to explore career paths, secure internships, and launch successful careers after graduation."
          />
          <Card
            title="Empowering Academic Exploration"
            image={img9}
            text="SU Buddy Provides Comprehensive Course Information Access"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

