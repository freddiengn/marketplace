import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGoogleUserInfo, logout } from "../services/AuthService";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(false); // Track error state for the API call
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // Hook for navigation

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Fetch Google user info on component mount
  useEffect(() => {
    getGoogleUserInfo()
      .then((data) => {
        console.log(data);
        setUserInfo(data); // Store the user info if the API call succeeds
        setIsLoggedIn(true); // Mark the user as logged in
        setError(false); // Reset error state on success
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
        setError(true); // Set error state to true if API call fails
        setIsLoggedIn(false); // User is not logged in
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Hide the header if there is an error or user is not logged in
  if (error || !isLoggedIn) {
    return null; // This hides the header if there is an error or not logged in
  }

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      // Call the logout function from AuthService
      await logout();

      // Reset the user info and login state
      setUserInfo(null);
      setIsLoggedIn(false);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  let button = (
    <>
      <li className="nav-item">
        <Link className="nav-link active" to="/chats">
          Chats
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle rounded-circle w-25"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded={dropdownOpen ? "true" : "false"}
          onClick={toggleDropdown}
        >
          {userInfo ? (
            <img
              src={userInfo.picture} // Use the picture from Google User info
              alt="User Profile"
              className="rounded-circle w-125"
            />
          ) : (
            <img
              src="https://via.placeholder.com/150" // Placeholder image if not available
              alt="User Profile"
              className="rounded-circle w-100"
            />
          )}
        </a>
        <ul
          className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}
          aria-labelledby="navbarDropdown"
        >
          <li>
            <a className="dropdown-item" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img
            src="https://en-news.tuj.ac.jp/wp-content/uploads/2023/04/tuj_news_logo.png"
            alt="temple Logo"
            className="d-inline align-left"
          />
          <p>
            <strong>
              <em>Owl Swap</em>
            </strong>
          </p>
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">{button}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;