import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage"; // Assuming you have a Home component
import LoginPage from "./pages/LoginPage";
import GoogleSignupPage from './pages/GoogleSignupPage';
import UsernameSignupPage from './pages/UsernameSignupPage';
import Chat from "./temp";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import MainLayout from "./layouts/MainLayout";
import ProductPage from "./pages/ProductPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/product" element={<MainLayout><ProductPage /></MainLayout>} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/product-details/:productid" element={<MainLayout><ProductDetailsPage /></MainLayout>} />
        <Route path="/signup" element={<GoogleSignupPage />} />
        <Route path="/signup/username" element={<UsernameSignupPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  );
};

export default App;