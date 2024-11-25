import api from "./BaseService";

const API_URL = "/products";

// Fetch all products
const getProducts = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

// Fetch product by ID
const getProductById = async (productId) => {
  try {
    const response = await api.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID", error);
    throw error;
  }
};

// Fetch products by category
const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`${API_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category", error);
    throw error;
  }
};

// Fetch products within a price range
const getProductsByPriceRange = async (minPrice, maxPrice) => {
  try {
    const response = await api.get(
      `${API_URL}/price?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by price range", error);
    throw error;
  }
};

// Create a new product
const createProduct = async (productData) => {
  try {
    const response = await api.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

// Update an existing product
const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`${API_URL}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

// Delete a product
const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

const getProductsByCurrentUser = async () => {
  try {
    const response = await api.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by user", error);
    throw error;
  }
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProducts,
  getProductById,
  getProductsByCategory,
  getProductsByPriceRange,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCurrentUser,
};
