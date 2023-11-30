import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUtensils, FaLuggageCart, FaAdn } from 'react-icons/fa'
import { MdOutlineSendToMobile } from "react-icons/md";

const CreatorMenu = () => {
    return <>

        <NavLink
            to="/dashboard/addContest"
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                }`
            }
        >
            <p className=''><FaAdn /></p>
            <span className='mx-4 font-bold'>Add Contest</span>
        </NavLink>
        <NavLink
            to="/dashboard/mycreatedContest"
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                }`
            }
        >
            <p className=''><FaLuggageCart /></p>
            <span className='mx-4 font-bold'>My Contest</span>
        </NavLink>
        <NavLink
            to="/dashboard/contestSubmittedPage"
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                }`
            }
        >
            <p className=''><MdOutlineSendToMobile  /></p>
            <span className='mx-4 font-bold'>Submitted Contest</span>
        </NavLink>


    </>
};

export default CreatorMenu;