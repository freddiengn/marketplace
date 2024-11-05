// src/pages/Login.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin
import { handleGoogleLogin } from '../services/AuthService'; // Import the auth service
import SuccessModal from '../components/SuccessModal';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check if there's an error in the URL
        const query = new URLSearchParams(location.search);
        if (query.get('error')) {
            setError('Login failed. Please try again.');
        } else if (query.get('success')) {
            setMessage('Login successful! Redirecting to home...');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/home');
            }, 2000);
        }
    }, [location, navigate]);

    // Handle Google login success
    const handleGoogleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse; // Extract credential from the response
        try {           
            const response = await handleGoogleLogin(credential); // Use the auth service to handle login
            if (response.email) {
                // Handle successful login
                setMessage('Login successful! Redirecting to home...');
                setShowModal(true);
                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                setError('Login failed. Please try again.'); // Handle server-side error
            }
        } catch (error) {
            setError(error.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google login failed: ', error);
        setError('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId="365155987060-645o2sm1sehrspf4uqhq2gsuv8ie12j2.apps.googleusercontent.com">
        <div className="min-h-screen max-w-md mx-auto mt-10 p-6 bg-white rounded-lg">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 mb-5 rounded">{error}</div>}
                
                {/* Google Login button */}
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    type='icon' // This can help display it like an icon button
                />
                
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
                <SuccessModal show={showModal} onHide={() => setShowModal(false)} message={message} />
            </div>
        </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
