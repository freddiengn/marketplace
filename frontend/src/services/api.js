import axios from 'axios';

const API_URL = 'http://localhost:8080/auth'; // Update with your backend URL

export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const signupUser = async (email, password, fullName) => {
    const response = await axios.post(`${API_URL}/signup`, { email, password, fullName });
    return response.data;
};
