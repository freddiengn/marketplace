import api from "./BaseService"; // Import your axios instance

// Send a message
export const sendMessage = async (messageDto) => {
  try {
    const response = await api.post("/message/send", messageDto);
    return response.data; // Return the message response from the backend
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Handle error appropriately
  }
};

// Get chat history for a buyer based on productId
export const getChatHistoryForBuyer = async (productId) => {
  try {
    const response = await api.get("/message/history/buyer", {
      params: { productId },
    });
    return response.data; // Return the chat history from the backend
  } catch (error) {
    console.error("Error getting chat history for buyer:", error);
    throw error; // Handle error appropriately
  }
};

// Get chat history for a seller based on productId and senderId
export const getChatHistoryForSeller = async (productId, senderId) => {
  try {
    const response = await api.get("/message/history/seller", {
      params: { productId, senderId },
    });
    return response.data; // Return the chat history from the backend
  } catch (error) {
    console.error("Error getting chat history for seller:", error);
    throw error; // Handle error appropriately
  }
};

// Get a list of senders for a specific product based on productId
export const getSendersForProduct = async (productId) => {
  try {
    const response = await api.get("/message/senders", {
      params: { productId },
    });
    return response.data; // Return the senders from the backend
  } catch (error) {
    console.error("Error getting senders for product:", error);
    throw error; // Handle error appropriately
  }
};

export default {
  sendMessage,
  getChatHistoryForBuyer,
  getChatHistoryForSeller,
  getSendersForProduct,
};