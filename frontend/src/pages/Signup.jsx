import React, { useState } from 'react';
import { signupUser, checkEmailExists, checkUserNameExists } from '../services/AuthService';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import SuccessModal from '../components/SuccessModal';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState(''); 
    const [credential, setCredential] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Check if username already exists
        try {
            const userNameExists = await checkUserNameExists(userName);
            if (userNameExists) {
                setError('Username is already taken.');
                return;
            }

            // Check if userEmail is valid and matches .edu pattern
            // const eduEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[edu]{2,}$/; // Adjusted pattern for .edu
            // if (!eduEmailPattern.test(userEmail)) {
            //     setError('Please provide a valid .edu email address.');
            //     return;
            // }
            if (!credential) {
                setError('Please choose email to continue.');
                return;
            }
            // Proceed with signup
            const data = await signupUser(credential, userName);
            console.log(data);
            setMessage('Signup successful! Redirecting to login...');
            setShowModal(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError('Error during signup. Please try again.');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;
        const decoded = jwtDecode(credential);
        const email = decoded.email;
        // Set user email from Google
        setCredential(credential);

        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setError('Email is already in use. Please log in or choose another account.');
            return; // If email exists, exit early
        }

        // Check if user email matches .edu pattern
        // const eduEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[edu]{2,}$/; // Adjusted pattern for .edu
        // if (!eduEmailPattern.test(email)) {
        //     setError('Please provide a valid .edu email address.');
        //     return;
        // }

        // Inform the user to choose a username and password
        setMessage(`Welcome, ${decoded.name}. Please complete your registration with a username and password.`);
    };

    const handleGoogleFailure = (error) => {
        console.error('Login failed: ', error);
        setError('Google login failed. Please try again.');
    };

    // Function to reset user details for another signup attempt
    const resetForm = () => {
        setUserName('');
        setUserEmail(''); // Clear user email as well
        setError(''); // Reset error state
        setMessage(''); // Reset message state
    };

    return (
        <GoogleOAuthProvider clientId="365155987060-645o2sm1sehrspf4uqhq2gsuv8ie12j2.apps.googleusercontent.com">
            <div className="min-h-screen max-w-md  mx-auto mt-10 p-6 bg-white rounded-lg">
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-5 text-center">Sign Up</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 mb-5 rounded">{error}</div>}
                
                {userEmail && (
                    <div className="bg-yellow-100 text-yellow-700 p-3 mb-5 rounded">
                        Current Email: <strong>{userEmail}</strong>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            id="userName" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Complete Signup
                    </button>
                </form>

                <div className="mt-5 text-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                        type='icon'
                    />
                </div>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
                </p>

                <SuccessModal show={showModal} onHide={() => setShowModal(false)} message={message} />
            </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Signup;
