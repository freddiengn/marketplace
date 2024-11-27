import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs"; // Stomp client for WebSocket
import axios from "axios";

// WebSocket URL (Backend endpoint)
const SOCKET_URL = "http://localhost:8080/chat";
const API_URL = "http://localhost:8080/user";

// Chat Service to handle WebSocket and HTTP communication
class MessageService {
  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.messages = [];
  }

  // Establish WebSocket connection
  connect(userName, onMessageReceived) {
    const socket = new SockJS(SOCKET_URL);
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        this.connected = true;
        console.log("Connected to WebSocket");
        this.subscribeToUserMessages(userName, onMessageReceived);
      },
      onDisconnect: () => {
        this.connected = false;
        console.log("Disconnected from WebSocket");
      },
    });

    this.stompClient.activate();
  }

  // Subscribe to user messages
  subscribeToUserMessages(userName, onMessageReceived) {
    this.stompClient.subscribe(
      `/topic/messages/${userName}`,
      (messageOutput) => {
        const message = JSON.parse(messageOutput.body);
        this.messages.push(message);
        if (onMessageReceived) {
          onMessageReceived(message);
        }
      }
    );
  }

  // Send a message to a specific user
  sendMessage(sender, receiver, messageContent) {
    if (this.stompClient && this.connected) {
      const messageDto = {
        sender,
        message: messageContent,
        receiver,
      };

      this.stompClient.publish({
        destination: `/app/chat/send/${receiver}`,
        body: JSON.stringify(messageDto),
      });
    }
  }

  // Fetch the current user's chats (via HTTP)
  async fetchUserChats() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  }
}

export default new MessageService();
