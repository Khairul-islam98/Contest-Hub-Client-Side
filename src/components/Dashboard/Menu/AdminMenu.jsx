import { NavLink } from 'react-router-dom'
import { FaUserCog } from 'react-icons/fa'
import { MdManageSearch } from "react-icons/md";
import { FaList } from "react-icons/fa";

const AdminMenu = () => {
    return (
        <>
            <NavLink
                to="/dashboard/manageUsers"
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <p className=''><FaUserCog></FaUserCog></p>
                 <span className='mx-4 font-bold'>Manage Users</span>
            </NavLink>
            <NavLink
                to="/dashboard/manageContest"
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-rose-400  text-gray-700' : 'text-gray-600'
                    }`
                }
            >
                <p className=''><FaList /></p>
                  <span className='mx-4 font-bold'>Manage Contest</span>
            </NavLink>
        </>
    )
}

export default AdminMenu


