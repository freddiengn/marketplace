import axios from 'axios';

const API_URL = 'http://localhost:8080/auth'; // Update with your backend URL

export const loginUser = async (userName, password) => {
    const response = await axios.post(`${API_URL}/login`, { userName, password });
    return response.data;
};

export const signupUser = async (userName, email, password) => {
    const response = await axios.post(`${API_URL}/signup`, { userName, email, password });
    return response.data;
};

// Function to check if email exists
export const checkEmailExists = async (email) => {
    const response = await axios.get(`${API_URL}/check-email/${email}`);
    return response.data; // This will be a boolean
};

// Function to check if username exists
export const checkUserNameExists = async (userName) => {
    const response = await axios.get(`${API_URL}/check-username/${userName}`);
    return response.data; // This will be a boolean
};