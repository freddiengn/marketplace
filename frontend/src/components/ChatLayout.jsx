import React, { useEffect, useState } from "react";
import { List, Card, Button } from "antd";
import MessageService from "../services/MessageService";

const ChatLayout = () => {
  const [chats, setChats] = useState([]);

  // Fetch the current user's chats when the component mounts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await MessageService.fetchUserChats();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <Card title="Your Chats" style={{ width: "400px", margin: "20px auto" }}>
      <List
        bordered
        dataSource={chats}
        renderItem={(chat, index) => (
          <List.Item key={index}>
            <strong>{chat.sender}</strong>: {chat.message}
            <Button
              type="link"
              onClick={() => console.log(`Start chat with ${chat.sender}`)} // Replace with actual chat navigation logic
              style={{ marginLeft: "auto" }}
            >
              Open Chat
            </Button>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ChatLayout;
