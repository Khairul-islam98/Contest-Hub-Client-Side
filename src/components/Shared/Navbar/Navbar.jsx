import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo/logo.gif'
import { RiHomeLine } from "react-icons/ri";
import useRole from '../../../hooks/useRole';


const Navbar = () => {
    const { user, logOut } = useAuth()
    const [role] = useRole()
    console.log(role);


    const [navbar, setNavbar] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const toggleNavbar = () => {
        setNavbar(!navbar);
    };

    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };

    const handleSignOut = () => {
        logOut()
            .then(() => {
                setProfileDropdown(false)
            })
            .catch()
    }
    const navLink = <>
        <li><NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-rose-500  btn-primary font-bold underline" : ""
            }
        >
            Home
        </NavLink></li>
        <li><NavLink
            to="/allcontestpage"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-rose-500  btn-primary font-bold underline" : ""
            }
        >
            All Contest
        </NavLink></li>
        <li><NavLink
            to="/leaderboard"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-rose-500  btn-primary font-bold underline" : ""
            }
        >
            Leaderboard
        </NavLink></li>
    </>

    return (
        <nav className="w-full bg-base-100   shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className='flex h-10 justify-center items-center'>
                            <img className='h-16 overflow-hidden' src={logo} alt="" />
                            <h2 className="w-5 font-bold uppercase lg:text-xl lg:w-auto">Contest <span className='text-rose-500'>Hub</span></h2>
                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={toggleNavbar}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`md:flex ${navbar ? "block" : "hidden"}`}> {/* Hide/show menu items based on navbar state */}
                    <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {navLink}
                        <li className="relative">
                            {
                                user ? <button
                                    className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none"
                                    onClick={toggleProfileDropdown}
                                >
                                    <img
                                        className="w-10 h-10 rounded-full border"
                                        src={user?.photoURL}
                                        // src='https://i.ibb.co/chgD72Z/my.jpg'
                                        alt="User Avatar"
                                    />
                                </button> :
                                    <Link to='/login'><button>Login</button></Link>
                            }
                            {profileDropdown && (
                                <div className="absolute  right-26 sm:mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 md:right-0 mt-0">
                                    <ul>
                                        <li>
                                            <p

                                                className="block px-4 py-2 text-gray-700"
                                            >
                                                {
                                                    user ? <h2 className='text-2xl'> {user && <span> {user?.displayName} </span>}</h2> :
                                                        ''
                                                }

                                            </p>
                                        </li>
                                        <li>
                                            {role === 'user' && <Link to='/dashboard/myParticipatedContest'>
                                                <button className='bg-rose-500 w-full rounded-md py-3 text-white mb-2'>Dashboard</button>
                                            </Link>}
                                            {role === 'creator' && <Link to='/dashboard/addContest'>
                                                <button className='bg-rose-500 w-full rounded-md py-3 text-white mb-2'>Dashboard</button>
                                            </Link>}
                                            {role === 'admin' && <Link to='/dashboard/manageUsers'>
                                                <button className='bg-rose-500 w-full rounded-md py-3 text-white mb-2'>Dashboard</button>
                                            </Link>}
                                            
                                        </li>
                                        <li>
                                            <button onClick={handleSignOut} className='bg-rose-500 w-full rounded-md py-3 text-white mb-2'>Sign Out</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;



