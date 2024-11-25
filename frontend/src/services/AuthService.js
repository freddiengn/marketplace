import api from "./BaseService"; // Import the configured API instance

// Function to handle Google login token
export const handleGoogleLogin = async (credential) => {
  const response = await api.post("/auth/google", { credential });
  return response.data;
};

// Function to sign up a new user
export const signupUser = async (credential, userName) => {
  const response = await api.post("/auth/signup", { credential, userName });
  return response.data;
};

// Function to get Google user information
export const getGoogleUserInfo = async () => {
  try {
    const response = await api.get("/auth/google-info");
    return response.data;
  } catch (error) {
    console.error("Error fetching Google user info:", error);
    throw error;
  }
};

// Function to check if email exists
export const checkEmailExists = async (email) => {
  const response = await api.get(`/auth/check-email/${email}`);
  return response.data; // This will be a boolean
};

// Function to check if username exists
export const checkUserNameExists = async (userName) => {
  const response = await api.get(`/auth/check-username/${userName}`);
  return response.data; // This will be a boolean
};

//to get the current user
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/current-user`);
    return response.data; // This will return the user info (e.g., email, roles)
  } catch (error) {
    console.error("Error fetching current user", error);
    throw error; // Handle error appropriately (could show a notification, etc.)
  }
};

// Function to log out the user
export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data; // This will be an empty response if the logout is successful
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
