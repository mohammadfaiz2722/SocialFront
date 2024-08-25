// HomePage.js

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Home.css'
const HomePage = () => {
  const navigate=useNavigate()

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to My Awesome App!</h1>
        <p>Your gateway to amazing  experiences.</p>
        
        <div className="cta-buttons">
        {!localStorage.getItem('token') && <Link to="/login" className="btn btn-primary">Log In</Link>}
        {!localStorage.getItem('token') &&<Link to="/signup" className="btn btn-secondary">Sign Up</Link>}
        
          {localStorage.getItem('token') && <Link to="/social-media" className="btn btn-primary">Social Media</Link> }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
