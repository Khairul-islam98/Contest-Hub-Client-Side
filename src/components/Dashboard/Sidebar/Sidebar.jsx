import React, { useState } from 'react';
import logo from '../../../assets/images/logo/logo.gif'

import { GrHome, GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import AdminMenu from '../Menu/AdminMenu';
import CreatorMenu from '../Menu/CreatorMenu';
import User from '../Menu/User';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { logOut, user } = useAuth()
    const [toggle, setToggle] = useState(false)
    const [isActive, setActive] = useState(false)
    const [role] = useRole()

    const toggleHandler = event => {
        setToggle(event.target.checked)
    }
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <>
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <img className='h-20 w-20 ' src={logo} alt="" />
                        <h2 className='font-bold'>Contest <span className='text-rose-500'>Hub</span></h2>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-50 mx-auto'>
                            <img className='h-20 w-20' src={logo} alt="" />
                        </div>
                        <h2 className='font-bold text-center mt-2'>Welcome! <span className='text-rose-500'>{user?.displayName}</span></h2>
                    </div>

                    <div className='flex flex-col justify-between flex-1 mt-6'>

                        <nav>

                            {role === 'user' && <User />}
                            {role === 'creator' && <CreatorMenu />}
                            {role === 'admin' && <AdminMenu />}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    <Link to='/'>
                            <button
                            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600  hover:bg-rose-400   hover:text-gray-700 transition-colors duration-300 transform'
                            >
                            <GrHome className='w-5 h-5' />
                            <span className='mx-4 font-medium'>Home</span>
                            </button>
                    </Link>
                  
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600  hover:bg-rose-400   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar;