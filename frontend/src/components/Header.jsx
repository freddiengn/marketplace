import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/* This component checks the current status of the login
and sends a boolean to check the status of the user */
const Header = (props) => {
  let button;
  if (props.loggedIn === "false") {
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
          <Link className="nav-link active" to="/logout">
            Logout
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/chats">
            Chats
          </Link>
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
          <p>Owl Swap</p>
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">{button}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
