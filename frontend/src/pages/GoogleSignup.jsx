import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Alert, Button, Card, Typography, Spin } from 'antd';
import { checkEmailExists } from '../services/AuthService';

const { Title } = Typography;

const GoogleSignup = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            const { credential } = credentialResponse;
            const decoded = jwtDecode(credential);
            const email = decoded.email;

            // Check if email exists
            const emailExists = await checkEmailExists(email);

            if (emailExists) {
                setError('This email is already registered. Please log in.');
                setLoading(false);
            } else {
                // Redirect to username page with email
                navigate('/signup/username', { state: { email, credential } });
            }
        } catch (err) {
            console.error('Error verifying email:', err);
            setError('An error occurred during signup. Please try again.');
            setLoading(false);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Google login failed: ', error);
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
                }} title={<Title level={3} style={{ color: '#000dff', fontWeight: 'bold', marginBottom: 24 }}>Sign Up with Google</Title>}>
                    {error && <Alert message={error} type="error" showIcon closable />}
                    {loading ? (
                        <Spin tip="Verifying..." size="large" />
                    ) : (
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
                                        height: '48px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        background: '#4285F4',
                                        borderColor: '#4285F4',
                                        borderRadius: '8px',
                                    }}
                                >
                                    Sign in with Google
                                </Button>
                            )}
                        />
                    )}
                </Card>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleSignup;