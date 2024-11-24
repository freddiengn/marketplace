import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signupUser, checkUserNameExists } from '../services/AuthService';
import { Alert, Input, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const UsernameSignup = () => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email, credential } = location.state || {};

    if (!email || !credential) {
        navigate('/signup'); // Redirect if no email is found
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userNameExists = await checkUserNameExists(userName);
            if (userNameExists) {
                setError('Username is already taken.');
                return;
            }

            await signupUser(credential, userName);
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Error during signup. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card style={{
                width: 500,
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                backgroundColor: '#ffffff',
                textAlign: 'center',
            }} title={<Title level={3} style={{ color: '#000dff', fontWeight: 'bold', marginBottom: 24 }}>Complete Signup</Title>}>
                {error && <Alert message={error} type="error" style={{ marginBottom: '16px' }} showIcon closable />}
                {message && <Alert message={message} type="success" style={{ marginBottom: '16px' }} showIcon />}
                
                <div style={{
                    marginBottom: 16,
                    borderRadius: "8px",
                    backgroundColor: "#d4edda",
                    borderColor: "#a0d911",
                    border: '1px solid',
                    color: "#155724",
                    padding: "8px 12px",
                }}>
                    <Text>Your email: <strong>{email}</strong></Text>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        style={{
                            height: '48px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            marginBottom: '20px',
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
                            marginBottom: '10px',
                        }}
                    >
                        Complete Signup
                    </Button>
                </form>

                <Button
                    type="default"
                    onClick={() => navigate('/signup')} // Navigate back to the signup page
                    block
                    style={{
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                    }}
                >
                    Back
                </Button>
            </Card>
        </div>
    );
};

export default UsernameSignup;