import React from 'react';
import img9 from '../images/news1.jpg';
import img10 from '../images/news2.jpg';
import img11 from '../images/news3.jpg';
import img12 from '../images/newsbackground.jpg';  

const News = () => {
  return (
    <section className="py-16 bg-cover bg-center" style={{backgroundImage: `url(${img12})`}}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* News Section 1 */}
          <a href="https://dailyorange.com/" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={img9} alt="News 1" className="w-full h-96 object-cover" />
              <div className="p-6">
                <p className="text-lg text-black">Recent news</p>
              </div>
            </div>
          </a>

          {/* News Section 2 */}
          <a href="https://dailyorange.com/2024/03/usen-dorm-construction-timeline/" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={img10} alt="News 2" className="w-full h-96 object-cover" />
              <div className="p-6">
                <p className="text-lg text-black">Syverud gives construction timeline for Ostrom Ave. residence hall at USen meeting</p>
              </div>
            </div>
          </a>

          {/* News Section 3 */}
          <a href="https://dailyorange.com/2024/03/lender-center-to-cornell-present-on-war-on-terror/" target="_blank" rel="noopener noreferrer" className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={img11} alt="News 3" className="w-full h-96 object-cover" />
              <div className="p-6">
                <p className="text-lg text-black">Lender Center Research Team makes trip to Cornell to present findings on war on terror.</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default News;
