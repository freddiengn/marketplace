import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"; // Assuming you have a Home component
import Login from "./pages/Login";
import GoogleSignup from './pages/GoogleSignup';
import UsernameSignup from './pages/UsernameSignup';
import Index from "./temp";
import PostDetails from "./components/PostDetails";
import Welcome from "./pages/Welcome";
import MainLayout from "./layouts/MainLayout";
import Product from "./pages/Product";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Welcome /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/product" element={<MainLayout><Product /></MainLayout>} />
        <Route path="/chats" element={<Index />} />
        <Route path="/post_details/:productid" element={<MainLayout><PostDetails /></MainLayout>} />
        <Route path="/signup" element={<GoogleSignup />} />
        <Route path="/signup/username" element={<UsernameSignup />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>

  );
};

export default App;