import api from "./BaseService"; 

export const sendMessage = async (messageDto) => {
  try {
    console.log(messageDto);
    const response = await api.post("/message/send", messageDto);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const getChatHistoryForBuyer = async (productId) => {
  try {
    const response = await api.get("/message/history/buyer", {
      params: { productId },
    });
    return response.data; 
  } catch (error) {
    console.error("Error getting chat history for buyer:", error);
    throw error; 
  }
};

export const getChatHistoryForSeller = async (productId, senderId) => {
  try {
    const response = await api.get("/message/history/seller", {
      params: { productId, senderId },
    });
    return response.data; 
  } catch (error) {
    console.error("Error getting chat history for seller:", error);
    throw error; 
  }
};

export const getSendersForProduct = async (productId) => {
  try {
    const response = await api.get("/message/senders", {
      params: { productId },
    });
    return response.data; 
  } catch (error) {
    console.error("Error getting senders for product:", error);
    throw error; 
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  sendMessage,
  getChatHistoryForBuyer,
  getChatHistoryForSeller,
  getSendersForProduct,
};