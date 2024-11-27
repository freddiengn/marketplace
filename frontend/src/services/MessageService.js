import api from "./BaseService";

const API_URL = "/chat";

const currentUserChats = async () => {
  try {
    const response = await api.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by user", error);
    throw error;
  }
};

export default currentUserChats;
