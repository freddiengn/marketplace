import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Note: this is from 'jwt-decode'
import { Alert, Card, Typography, Spin } from "antd";
import { checkEmailExists } from "../services/AuthService";

const { Title, Text } = Typography;

const GoogleSignupPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const { credential } = credentialResponse;
      const decoded = jwtDecode(credential);
      const email = decoded.email;

    
    if (!email.endsWith("@temple.edu")) {
      setError("Only @temple.edu email addresses can register.");
      return;
    }

      // Check if the email already exists in the database
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        setError(
          `The email "${email}" is already registered. Please log in or use a different email.`
        );
      } else {
        // Redirect to the username setup page
        navigate("/signup/username", { state: { email, credential } });
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      setError("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
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
              Sign Up with Google
            </Title>
          }
        >
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

          {loading ? (
            <Spin tip="Verifying..." size="large" />
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              type="icon"
            />
          )}

          {/* Login link at the bottom */}
          <Text
            style={{
              display: "block",
              marginTop: 24,
              fontSize: "14px",
              color: "#6c757d",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#000dff",
                fontWeight: "bold",
              }}
            >
              Log In
            </a>
          </Text>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignupPage;