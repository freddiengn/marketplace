// src/pages/Signup.js

import React, { useState } from 'react';
import { signupUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await signupUser(email, password, fullName);
            // Handle successful signup
            console.log(data);
            setMessage('Signup successful! Redirecting to login...');
            setShowModal(true);
            setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        } catch (err) {
            setError('Error signing up. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>

            <SuccessModal show={showModal} onHide={() => setShowModal(false)} message={message} />
        </div>
    );
};

export default Signup;
