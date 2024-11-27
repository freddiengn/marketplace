import React from "react";
import { useParams } from "react-router-dom";
import ChatInterface from "../components/ChatInterface";

const Chat = () => {
  const { userName } = useParams(); // Get the username from URL parameters

  return (
    <div>
      <h2>Welcome to the chat page, {userName}</h2>
      <ChatInterface /> {/* Render the ChatInterface component */}
    </div>
  );
};
export default Chat;
