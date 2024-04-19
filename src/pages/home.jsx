import StudentCard from '../components/studentCard'; 
import React, { useState, useEffect } from 'react';
import backgroundImage from '../images/su.jpg'
import axios from 'axios';

const HomePage = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
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
    
        fetchData();
      }, []); 

    // // const renderContent = () => {
    //     if (error) {
    //         return <div>Error: {error.message}</div>;
    //     } else if (!isLoaded) {
    //         return <div>Loading...</div>;
    //     } else {
    //         return (
    //             <div className="wrapper">
    //                 <ul className="card-grid">
    //                     {items.map((item) => (
    //                         <li>
    //                             <article className="card" key={item.callingCodes}>
    //                                 <div className="card-image">
    //                                     <img src="https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fdfstudio-d420.kxcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F06%2Fdigital_camera_photo-1080x675.jpg&imgrefurl=https%3A%2F%2Fwww.dfstudio.com%2Fdigital-image-size-and-resolution-what-do-you-need-to-know%2F&docid=KEFtss0dYCDpzM&tbnid=0kl2WrGN8BrkhM&vet=12ahUKEwjB88-PzcWFAxUPD1kFHeNtALYQM3oECBwQAA..i&w=1080&h=675&hcb=2&ved=2ahUKEwjB88-PzcWFAxUPD1kFHeNtALYQM3oECBwQAA" />
    //                                 </div>
    //                                 <div className="card-content">
    //                                     <h2 className="card-name">{item.name}</h2>
    //                                     <ol className="card-list">
    //                                         <li>
    //                                             Name:{" "}
    //                                             <span>{item.firstName}</span>
    //                                         </li>
    //                                         <li>
    //                                             Department:{" "}
    //                                             <span>{item.department}</span>
    //                                         </li>
    //                                     </ol>
    //                                 </div>
    //                             </article>
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         );
    //     }
    //  }

    return (
        <section className="relative min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: `url(${backgroundImage})`, filter: 'brightness(80%)'}}>
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



    //   return (
    //     <div>
    //         {renderContent()}
    //     </div>
    //   );
export default HomePage;