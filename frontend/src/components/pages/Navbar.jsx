import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/images/hospital_logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const selector = useSelector((store) => store.user);
  const userName = selector?.user?.user?.name;

  return (
    <div className="bg-gray-800 z-10 text-white py-4 px-6 flex items-center justify-between fixed w-full">
      <Link to="/">
        <img src={logo} alt="Hospital Logo" className="w-16 h-8" />
      </Link>

      {/* Hamburger Icon */}
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="focus:outline-none text-white flex flex-col justify-end">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`lg:flex items-center gap-12 transition-all duration-300 ease-in-out ${
          isOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-gray-800 py-4' : 'hidden'
        } lg:static lg:flex-row lg:bg-transparent lg:py-0`}
      >
        <Link to="/" className="text-white hover:text-blue-700 font-bold py-2 px-4">Home</Link>
        <Link to="/about" className="text-white hover:text-blue-700 font-bold py-2 px-4">About</Link>
        <Link to="/department" className="text-white hover:text-blue-700 font-bold py-2 px-4">Department</Link>
        <Link to="/contact" className="text-white hover:text-blue-700 font-bold py-2 px-4">Contact</Link>

        {userName ? (
          <h1 className="bg-green-400 text-white p-2 rounded-sm py-2 px-4">Welcome {userName}</h1>
        ) : (
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <Link to="/login" className="bg-yellow-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">SIgnup</Link>
            <Link to="/register" className="bg-yellow-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
