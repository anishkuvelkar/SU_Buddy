//mongodb+srv://anishkuvelkar88:SUBUDDY123@cluster0.a4dlk0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';
//import Card from '../components/Card'; // Assuming you have a Card component for individual items

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

    const renderContent = () => {
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="wrapper">
                    <ul className="card-grid">
                        {items.map((item) => (
                            <li>
                                <article className="card" key={item.callingCodes}>
                                    <div className="card-image">
                                        <img src="https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fdfstudio-d420.kxcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F06%2Fdigital_camera_photo-1080x675.jpg&imgrefurl=https%3A%2F%2Fwww.dfstudio.com%2Fdigital-image-size-and-resolution-what-do-you-need-to-know%2F&docid=KEFtss0dYCDpzM&tbnid=0kl2WrGN8BrkhM&vet=12ahUKEwjB88-PzcWFAxUPD1kFHeNtALYQM3oECBwQAA..i&w=1080&h=675&hcb=2&ved=2ahUKEwjB88-PzcWFAxUPD1kFHeNtALYQM3oECBwQAA" />
                                    </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{item.name}</h2>
                                        <ol className="card-list">
                                            <li>
                                                Name:{" "}
                                                <span>{item.firstName}</span>
                                            </li>
                                            <li>
                                                Department:{" "}
                                                <span>{item.department}</span>
                                            </li>
                                        </ol>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }


    //             <div>
    //                 <div className="cards-container">
    //                     {items.map(item => (
    //                         <li key={item._id}>
    //                             <article className="card">
    //                                 <div className="card-image">
    //                                     <img src={item.imageUrl} alt={item.title} />
    //                                 </div>
    //                                 <div className="card-content">
    //                                     <h2 className="card-name">{item.title}</h2>
    //                                     <ol className="card-list">
    //                                         <li>
    //                                             Description: <span>{item.firstName}</span>
    //                                         </li>
    //                                         {/* other item properties */}
    //                                     </ol>
    //                                 </div>
    //                             </article>
    //                         </li>
    //                     ))}
    //                 </div>
    //             </div>
    //         );
    //     }
    //   };
    
      return (
        <div>
            {renderContent()}
        </div>
      );
};
export default HomePage;