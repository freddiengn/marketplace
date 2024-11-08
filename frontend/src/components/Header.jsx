import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">My React App</Link>
                
                <button 
                    onClick={toggleMenu} 
                    className="navbar-toggler" 
                    type="button" 
                    aria-controls="navbarNav" 
                    aria-expanded={isOpen ? "true" : "false"} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;