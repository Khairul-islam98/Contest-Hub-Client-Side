import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularContest } from '../../../api/creator';

const PopularContest = ({contestData, setContestData}) => {

    // const[contestData, setContestData] = useState([])

    


    return (
        <div>
            <div>
                <h1 className='font-bold text-center text-4xl py-5'>popular <span className='text-rose-400'>contest</span></h1>
            </div>
             <div className="grid mx-auto gap-3 py-10 mb-5 md:grid-cols-2 lg:grid-cols-3  w-5/6" data-aos="fade-up"
                data-aos-duration="3000">
                {contestData.map((contest) => (
                    <div key={contest._id} className="relative max-h-96 flex mt-10 flex-col text-gray-700 bg-white shadow-md  rounded-xl bg-clip-border">
                        <div className="relative mx-auto bottom-10   overflow-hidden">
                            <img className='rounded-full w-36 h-32'
                                src={contest?.image}
                                alt="img-blur-shadow"
                                layout="fill"
                            />
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans antialiased font-semibold leading-snug tracking-normal text-rose-900">
                                {contest?.contestname}
                            </h5>
                            <p>Attempted Count: {contest.participantsCount}</p>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                {contest?.description.slice(0, 80)}<span className='text-rose-400'>......</span>
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                           <Link to={`/contest-details/${contest._id}`}>
                           <button
                                className="w-full rounded-lg bg-pink-500 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-ripple-light="true"
                            >
                                Details
                            </button>
                           </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularContest;