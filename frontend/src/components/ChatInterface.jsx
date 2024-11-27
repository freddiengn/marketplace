// src/components/ChatInterface.js

import React, { useState, useEffect } from "react";
import { Input, Button, List, Card } from "antd";
import MessageService from "../services/MessageService"; // Import the WebSocket service
import { useParams } from "react-router-dom";

const ChatInterface = () => {
  const { userName } = useParams(); // Extract username from route parameters
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(""); // Store the new message being typed

  // Set up WebSocket connection when the component mounts
  useEffect(() => {
    const onMessageReceived = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Add received message to state
    };

    // Connect to WebSocket and listen for new messages
    MessageService.connect(userName, onMessageReceived);

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (MessageService.stompClient) {
        MessageService.stompClient.deactivate();
      }
    };
  }, [userName]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send the message via WebSocket
      MessageService.sendMessage(userName, "anotherUser", newMessage); // Replace 'anotherUser' with actual receiver
      setNewMessage(""); // Clear input field after sending the message
    }
  };

  return (
    <Card
      title={`Chat with ${userName}`}
      style={{ width: "400px", margin: "20px auto" }}
    >
      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          marginBottom: "20px",
        }}
      >
        <List
          dataSource={messages}
          renderItem={(message, index) => (
            <List.Item key={index}>
              <strong>{message.sender}</strong>: {message.message}
            </List.Item>
          )}
        />
      </div>

      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        onPressEnter={handleSendMessage}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={handleSendMessage} block>
        Send
      </Button>
    </Card>
  );
};

export default ChatInterface;
