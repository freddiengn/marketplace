// src/components/ChatBox.js
import React from "react";
import { Button, Input, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ChatBox = ({ chatVisible, setChatVisible, messages, message, setMessage, handleSendMessage, isSeller }) => {
  return (
    chatVisible && (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "400px",
          minHeight: "500px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Chat with {isSeller ? "Buyer" : "Seller"}
          </Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setChatVisible(false)}
          />
        </div>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
          }}
        >
          {messages && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <Text strong>{msg.senderName}:</Text> <Text>{msg.message}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </Text>
              </div>
            ))
          ) : (
            <Text type="secondary">No messages yet. Start the conversation!</Text>
          )}
        </div>
        <div
          style={{
            padding: "10px",
            display: "flex",
            gap: "10px",
            position: "absolute",
            bottom: "0px",
            width: "100%",
          }}
        >
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            placeholder="Type your message"
          />
          <Button
            type="primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    )
  );
};

export default ChatBox;