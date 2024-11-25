import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class MessageService {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  connect(username, onMessageReceived) {
    this.client = new Client({
      brokerURL: "http://localhost:8080/chat",
      connectHeaders: {
        username: username, // optionally send username for identification
      },
      reconnectDelay: 5000, // retry after 5 seconds if disconnected
      webSocketFactory: () => new SockJS("http://localhost:8080/chat"), // WebSocket endpoint
      onConnect: () => {
        this.connected = true;
        console.log("WebSocket Connected");
        this.subscribeToMessages(onMessageReceived); // Subscribe to the messages after connection
      },
      onDisconnect: () => {
        this.connected = false;
        console.log("WebSocket Disconnected");
      },
    });
    this.client.activate(); // Activate the WebSocket connection
  }

  // Subscribe to the message channel
  subscribeToMessages(onMessageReceived) {
    this.client.subscribe("/topic/messages", (message) => {
      // Trigger the callback to handle the incoming message
      const messageBody = JSON.parse(message.body);
      onMessageReceived(messageBody);
    });
  }

  sendMessage(destination, message) {
    if (this.connected) {
      // Send a message to the specified destination
      this.client.publish({
        destination: destination,
        body: JSON.stringify(message),
      });
    } else {
      console.log("Not connected to WebSocket");
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }
}

export default new MessageService();
