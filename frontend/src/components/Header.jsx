import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGoogleUserInfo } from '../services/AuthService';

const isLoggedIn = localStorage.getItem("token") !== null;
const Header = (props) => {
  let button;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  // Fetch Google user info on component mount
  useEffect(() => {
 
      getGoogleUserInfo()
        .then((data) => {
          console.log(data);
          setUserInfo(data); // Store the user info
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    
  }); // Only run when the login status changes
  if (isLoggedIn) {
    button = (
      <>
        <li className="nav-item">
          <Link className="nav-link active" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/signup">
            Sign Up
          </Link>
        </li>
      </>
    );
  } else {
    button = (
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
              <a className="dropdown-item" href="/">
                logout
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                settings
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
  }
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