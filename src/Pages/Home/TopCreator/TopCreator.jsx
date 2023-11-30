import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const TopCreator = () => {
  const [topCreators, setTopCreators] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('https://contest-hub-server-kappa.vercel.app/top-creators-details')
      .then(response => {
        setTopCreators(response.data);
      })
      .catch(error => {
        console.error('Error fetching top creators:', error);
      });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-2xl font-bold  text-center mb-14">Top Contest <span className='text-rose-400'>Creators</span></h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        arrows={true}
        className=' justify-center'
        removeArrowOnDeviceType={['tablet', 'mobile', 'desktop' ]}
      >
        {topCreators.map((creator, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md lg:h-[360px] ml-10 " data-aos="fade-down-right">
            <img src={creator.creatorImage} alt="Creator" className="w-32 h-32 rounded-full mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-center">{creator.creatorName}</h3>
            <h4 className="text-lg text-gray-600 mb-2 text-center">{creator.contestName}</h4>
            <p className="text-sm text-center">{creator.description.slice(0, 80)}</p>
            <p className="text-xs text-gray-500 mt-2 text-center">Total Contests: {creator.totalContests}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default TopCreator;
