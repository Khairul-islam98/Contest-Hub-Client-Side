// import React, { useState } from 'react';
import banner from '../../../assets/images/banner/banner.png'
import { Link } from 'react-router-dom';
// import axios from 'axios';

const Banner = ({contestData, setContestData}) => {
  // const [contestData, setContestData] = useState([])
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    fetch(`https://contest-hub-server-kappa.vercel.app/contests/search?searchTerm=${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        setContestData(data);
      })
  };

 
  return (
    <div>
      <div className='min-h-[500px] opacity-95 mb-5' style={{ backgroundImage: `url(${banner})` }}>
        <div className='flex  justify-center items-center py-52 mx-auto'>
          <div className="text-center">
            <form onSubmit={handleSearch}>
              <input className="py-1 rounded-l-xl pt-3 pb-2 pl-2 ring-1 border-s-gray-50 border-s-2 border border-gray-300 outline-none md:w-[420px]" type="text" name="search" placeholder="Search here..." />
              <button className="bg-rose-500 mt-2 pt-3 px-4 py-2 rounded-r-md text-white">Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;