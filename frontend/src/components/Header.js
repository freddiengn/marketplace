import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link className="text-xl font-bold text-gray-800" to="/">My React App</Link>
                <button onClick={toggleMenu} className="md:hidden text-gray-800 focus:outline-none" aria-label="Toggle navigation">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className={`md:flex md:items-center md:space-x-4 ${isOpen ? "block" : "hidden"} absolute md:static bg-white w-full md:w-auto z-10`}>
                    <Link className="block text-gray-600 hover:text-blue-600 px-4 py-2" to="/login">Login</Link>
                    <Link className="block text-gray-600 hover:text-blue-600 px-4 py-2" to="/signup">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;