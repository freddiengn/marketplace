import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown, Avatar, Layout, Button } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { getGoogleUserInfo, logout } from "../services/AuthService";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getGoogleUserInfo()
      .then((data) => {
        setUserInfo(data);
        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setError(true);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo(null);
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
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
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
        to="/home"
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
