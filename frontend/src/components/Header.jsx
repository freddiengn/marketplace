// components/Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Avatar, Layout, Button } from "antd";
import {
  ProductOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<MessageOutlined />}>
        <Link to="/chats">Chats</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<ProductOutlined />}>
        <Link to="/product">My Product</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "#fff",
        }}
      >
        <img
          src="https://en-news.tuj.ac.jp/wp-content/uploads/2023/04/tuj_news_logo.png"
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <strong style={{ fontSize: "20px", fontStyle: "italic" }}>
          Owl Swap
        </strong>
      </Link>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {userInfo ? (
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar src={userInfo.picture} alt="User Avatar" />
            </div>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
