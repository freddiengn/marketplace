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

        try {
            const userNameExists = await checkUserNameExists(userName);
            if (userNameExists) {
                setError('Username is already taken.');
                return;
            }

            if (!credential) {
                setError('Please choose an email to continue.');
                return;
            }

            const data = await signupUser(credential, userName);
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
        setCredential(credential);

        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setError('Email is already in use. Please log in or choose another account.');
            return;
        }

        setMessage(`Welcome, ${decoded.name}. Please complete your registration with a username.`);
    };

    const handleGoogleFailure = (error) => {
        console.error('Login failed: ', error);
        setError('Google login failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    {userEmail && (
                        <div className="alert alert-warning">
                            Current Email: <strong>{userEmail}</strong>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="userName" 
                                value={userName} 
                                onChange={(e) => setUserName(e.target.value)} 
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100"
                        >
                            Complete Signup
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            type="icon"
                        />
                    </div>

                    <p className="text-center mt-3">
                        Already have an account? <Link to="/">Login</Link>
                    </p>

                    <SuccessModal show={showModal} onHide={() => setShowModal(false)} message={message} />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Signup;