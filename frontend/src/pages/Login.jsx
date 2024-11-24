import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../services/AuthService";
import { Card, Typography, Alert, Button } from "antd";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("error")) {
      setError("Login failed. Please try again.");
    } else if (query.get("success")) {
      navigate("/home");
    }
  }, [location, navigate]);

  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
 
      const response = await handleGoogleLogin(credential);
      if (response.email) {
        setMessage("Login successful! Redirecting to home...");
        setShowModal(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
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
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card
          style={{
            maxWidth: 400,
            width: "100%",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            textAlign: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <Title level={2} style={{ color: "#000dff", fontWeight: "bold", marginBottom: 24 }}>
            Welcome Back
          </Title>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{
                marginBottom: 16,
                borderRadius: "8px",
              }}
            />
          )}

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={(renderProps) => (
              <Button
                type="primary"
                block
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "#4285F4",
                  borderColor: "#4285F4",
                  borderRadius: "8px",
                }}
              >
                Sign in with Google
              </Button>
            )}
          />

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

export default Login;