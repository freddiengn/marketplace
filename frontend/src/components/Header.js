import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/* This component checks the currents status of the login
Send a boolean to check the status of the user*/
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a class="navbar-brand" href="/home">
          Owl Swap
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">{button}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
