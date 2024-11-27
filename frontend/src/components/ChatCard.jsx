import React, { useState, useEffect } from "react";
import { List, Input, Button, Card } from "antd";
import MessageService from "../services/MessageService";

const ChatPage = ({ userName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Establish WebSocket connection and subscribe to messages
  useEffect(() => {
    const onMessageReceived = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Connect to WebSocket and subscribe to the messages of this user
    MessageService.connect(userName, onMessageReceived);

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      if (MessageService.stompClient) {
        MessageService.stompClient.deactivate();
      }
    };
  }, [userName]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send the message through the service (WebSocket)
      MessageService.sendMessage(userName, "anotherUser", newMessage); // Replace 'anotherUser' with actual receiver
      setNewMessage(""); // Clear input field
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

export default ChatPage;
