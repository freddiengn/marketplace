import React, { useEffect, useState } from "react";
import MessageService from "../services/MessageService";
// If you are using Ant Design for the error message, import it like this:
// import { message } from 'antd';

const Chat = () => {
  const [messages, setMessages] = useState([]); // Use state to store messages
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await MessageService.currentUserChats();
        setMessages(response); // Store messages in the state
        setLoading(false); // Set loading to false when done
      } catch (error) {
        setError("Failed to fetch chats."); // Handle error
        setLoading(false); // Set loading to false on error
      }
    };

    fetchMessages();
  }, []); // Empty dependency array to run the effect once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error if something goes wrong
  }

  return (
    <div>
      <div>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message.receiver}</li> // Use a key for each list item
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
