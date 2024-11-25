import React, { useEffect, useState } from "react";
import WebSocketService from "../services/MessageService"; // Your WebSocket service
import { useUser } from "../context/userContext"; // Context for user info

const Chat = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const onMessageReceived = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    if (user) {
      WebSocketService.connect(user.username, onMessageReceived);
    }
    return () => {
      WebSocketService.disconnect();
    };
  }, [user]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        message,
        sender: user,
        receiver: "otherUser", // This would be dynamic based on the chat
      };
      WebSocketService.sendMessage(`/app/chat/send/otherUser`, messageData); // Update `otherUser` dynamically
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender.username === user.username
                ? "my-message"
                : "other-message"
            }
          >
            <strong>{msg.sender.username}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
