import React, { useState } from 'react';
import { signupUser, checkEmailExists, checkUserNameExists } from '../services/AuthService';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Button, Input, Card, Alert, Space, Typography } from 'antd';
import SuccessModal from '../components/SuccessModal';

const { Title, Text } = Typography;

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
                <Card style={{
                    width: 400,
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#ffffff',
                    textAlign: 'center',
                }} title={<Title level={3} style={{ color: '#000dff', fontWeight: 'bold', marginBottom: 24 }}>Sign Up</Title>}>

                    {error && <Alert message={error} type="error" showIcon closable />}

                    {userEmail && (
                        <Alert message={`Current Email: ${userEmail}`} type="warning" showIcon />
                    )}

                    <form onSubmit={handleSubmit}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input
                                placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                style={{
                                    height: '48px',
                                    fontSize: '16px',
                                    borderRadius: '8px',
                                }}
                            />
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    background: '#4285F4',
                                    borderColor: '#4285F4',
                                    borderRadius: '8px',
                                }}
                            >
                                Complete Signup
                            </Button>
                        </Space>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            render={(renderProps) => (
                                <Button
                                  type="primary"
                                  block
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                  style={{
                                    height: "48px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    background: "#4285F4",
                                    borderColor: "#4285F4",
                                    borderRadius: "8px",
                                  }}
                                >
                                  Sign in with Google
                                </Button>
                              )}
                        />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Text>Already have an account? <Link to="/login" style={{ color: '#000dff', fontWeight: 'bold' }}>Login</Link></Text>
                    </div>
                </Card>
            </div>

            <SuccessModal show={showModal} onHide={() => setShowModal(false)} message={message} />
        </GoogleOAuthProvider>
    );
};

export default Signup;