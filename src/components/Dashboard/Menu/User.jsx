import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaAccusoft, FaProjectDiagram, FaUtensils, FaWonSign } from 'react-icons/fa';

const User = () => {
    return (
        <>
         <NavLink
            to="/dashboard/myParticipatedContest"
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                }`
            }
        >
            <p className=''><FaAccusoft /></p>
            <span className='mx-4 font-bold'>My Participated Contest</span>
        </NavLink>
         <NavLink
            to="/dashboard/myWinnigContest"
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                }`
            }
        >
            <p className=''><FaWonSign /></p>
            <span className='mx-4 font-bold'>My Winnig Contest</span>
        </NavLink>
         <NavLink
            to="/dashboard/myProfile"
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                }`
            }
        >
            <p className=''><FaProjectDiagram /></p>
            <span className='mx-4 font-bold'>My Profile</span>
        </NavLink>
        </>
    );
};

export default User;