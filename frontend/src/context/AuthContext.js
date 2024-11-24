// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGoogleUserInfo, logout as logoutFromApi } from '../services/AuthService';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    const fetchUserInfo = async () => {
      try {
        const data = await getGoogleUserInfo();
        if (data) {
          setUserInfo(data);
        } else {
          setUserInfo(null);
          navigate('/login'); 
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setUserInfo(null);
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const login = (userData) => {
    setUserInfo(userData);
    navigate('/'); 
  };

  const logout = async () => {
    try {
      await logoutFromApi();
      
      setUserInfo(null);

      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };