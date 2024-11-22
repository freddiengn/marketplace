import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Assuming you have a Home component
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Index from "./temp";
import PostDetails from "./components/PostDetails";
import Welcome from "./pages/Welcome";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<MainLayout><Welcome /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<Index />} />
        <Route path="/post_details/:productid" element={<MainLayout><PostDetails /></MainLayout>} />
        {/* Add more routes as needed */}
      </Routes>
  
    </Router>
  );
};

export default App;