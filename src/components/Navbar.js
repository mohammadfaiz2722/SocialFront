// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // Import custom CSS for the Navbar
import { Link,  useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate()
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#home">FaizBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
            {!localStorage.getItem('token')&& <Link className="nav-link" to="/login">Login</Link>}
              {localStorage.getItem('token')&& <button className="nav-link" onClick={()=>{localStorage.clear(); window.location.reload() }}>Logout</button>}
            </li>
            <li className="nav-item">
            {!localStorage.getItem('token')&& <Link className="nav-link" to="/signup">Register</Link>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
