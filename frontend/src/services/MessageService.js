import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class MessageService {
  constructor() {
    this.client = null;
  }

  connect() {
    this.client = new Client({
      brokerURL: "http://localhost:8080/chat", // Backend WebSocket URL
      connectHeaders: {},
      debug: (str) => {
        console.log(str); // Optional: for debugging WebSocket connection
      },
      onConnect: () => {
        console.log("WebSocket connected!");
        this.subscribeToMessages();
      },
      onWebSocketError: (error) => {
        console.log("WebSocket Error: ", error);
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      reconnectDelay: 5000, // Optionally configure reconnect delay
      heartbeatIncoming: 4000, // Optional: heartbeat configurations
      heartbeatOutgoing: 4000,
    });

    this.client.activate();
  }

  subscribeToMessages() {
    // Subscribe to a topic that you're interested in
    this.client.subscribe("/topic/messages", (message) => {
      console.log("Received message: ", message.body);
      // Handle received message
    });
  }

  sendMessage(destination, message) {
    if (this.client && this.client.connected) {
      this.client.send(destination, {}, JSON.stringify(message));
      console.log("Sent message: ", message);
    } else {
      console.log("WebSocket client not connected.");
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      console.log("Disconnected from WebSocket");
    }
  }
}

export default new MessageService();
