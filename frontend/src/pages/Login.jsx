// src/pages/Login.js

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin
import { handleGoogleLogin } from "../services/AuthService"; // Import the auth service
import SuccessModal from "../components/SuccessModal";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if there's an error in the URL
    const query = new URLSearchParams(location.search);
    if (query.get("error")) {
      setError("Login failed. Please try again.");
    } else if (query.get("success")) {
      navigate("/home");
    }
  }, [location, navigate]);

  // Handle Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse; // Extract credential from the response
    try {
      const response = await handleGoogleLogin(credential); // Use the auth service to handle login
      if (response.email) {
        // Handle successful login
        setMessage("Login successful! Redirecting to home...");
        setShowModal(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        setError("Login failed. Please try again."); // Handle server-side error
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
      <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-dark">
        <div
          className="card p-4 shadow-lg rounded-circle"
          style={{ maxWidth: "400px", width: "50%" }}
        >
          <h2 className="card-title text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Google Login button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            type="icon" // Display as icon button if needed
          />

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;