import React from 'react';
import logo from '../../../../public/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="mb-4 flex justify-center items-center gap-2 lg:mb-0">
          <img className='w-10' src={logo} alt="" />
          <p className="text-xl mr-4 font-bold">Contest <span className='text-rose-400'>Hub</span></p>
        </div>
        <div className="flex flex-wrap">
          <ul className="mr-8 mb-4">
            <li className="mb-2">
              <a href="#" className="hover:text-white">Home</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">About</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">Services</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">Contact</a>
            </li>
          </ul>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-white">Privacy Policy</a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-900 py-2 text-center">
        <p className="text-sm">&copy; 2023 Contest Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
