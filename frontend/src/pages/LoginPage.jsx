import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../services/AuthService";
import { Card, Typography, Alert, Spin } from "antd";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("error")) {
      setError("Login failed. Please try again.");
    } else if (query.get("success")) {
      navigate("/");
    }
  }, [location, navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      setLoading(true); 
      const response = await handleGoogleLogin(credential);
      if (response.email) {
        setMessage("Login successful! Redirecting to home...");
        setError("");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed: ", error);
    setError("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Card
          style={{
            width: 500,
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
          title={
            <Title
              level={3}
              style={{
                color: "#000dff",
                fontWeight: "bold",
                marginBottom: 24,
              }}
            >
              Welcome Back
            </Title>
          }
        >
          {/* Error Alert with Close Button */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
              closable
              onClose={() => setError("")}
            />
          )}

          {/* Success Message Alert */}
          {message && (
            <Alert
              message={message}
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {/* Google Login Button */}
          {loading ? (
            <Spin tip="Logging in..." size="large" />
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              type="icon"
            />
          )}

          <Text
            style={{
              display: "block",
              marginTop: 24,
              textAlign: "center",
              color: "#6c757d",
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#000dff",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>
          </Text>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;