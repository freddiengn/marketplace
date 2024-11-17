// services/ProductService.js
import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = 'http://localhost:8080/api/products'; // Update with your backend URL

// Fetch all products
const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products', error);
    throw error;
  }
};

// Create a new product
const createProduct = async (productData) => {
  try {
    console.log(productData);
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
};

export default {
  getProducts,
  createProduct,
};