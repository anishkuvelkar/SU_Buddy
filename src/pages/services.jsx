import React from 'react';

const Services = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center mb-12 border-b border-gray-800">Services we provide</h1>

        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Left Side */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            {/* Service Section 1 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Social Connection</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>SU Buddy facilitates social connections among international students.</li>
                  <li>Fosters a sense of community and belonging crucial for those studying away from home.</li>
                </ul>
              </div>
            </div>

            {/* Service Section 2 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Cultural Exchange</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Encourages cultural exchange and understanding.</li>
                  <li>Connects students from diverse backgrounds to share experiences and perspectives.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2">
            {/* Service Section 3 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Networking Opportunities</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Students can expand their professional networks and opportunities for future collaborations.</li>
                </ul>
              </div>
            </div>

            {/* Service Section 4 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">User Profiles</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Each user has a personalized profile to manage information and connections.</li>
                  <li>View buddies, forum posts, events attended, and other relevant details.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="flex flex-col md:flex-row justify-between items-start mt-8">
          {/* Left Side */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            {/* Service Section 5 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Mentorship Program</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Students can reach out for mentorship and connect with experienced individuals.</li>
                  <li>Receive guidance, advice, and support for academic challenges, career decisions, and personal development.</li>
                </ul>
              </div>
            </div>

            {/* Service Section 6 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Study Groups Formation</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Helps students form study groups for collaborative learning and academic support.</li>
                  <li>Connect with peers studying similar subjects to share resources and prepare for exams together.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2">
            {/* Service Section 7 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Stay Connected</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Dedicated platform for students to stay connected with peers, professors, and the university community.</li>
                </ul>
              </div>
            </div>

            {/* Service Section 8 */}
            <div className="flex flex-col mb-12">
              <div className="pl-4">
                <h2 className="text-2xl font-semibold mb-2">Exclusive Access for SU Students</h2>
                <ul className="list-disc text-gray-700 pl-6">
                  <li>Exclusively serves Syracuse University students, fostering a secure environment for interaction and support.</li>
                  <li>Tailored resources and networking opportunities enhance the student experience.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
