import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation after component mounts
    setIsVisible(true);
  }, []);

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <div className={`content ${isVisible ? 'visible' : ''}`}>
        <div className="header">
          <h1>Empowering Seekers.</h1>
          <h1>Connecting Opportunities.</h1>
        </div>
        <p className="description">
          Join the Seekers Platform, where researchers, innovators, and professionals
          find resources, collaborate and unlock new possibilities.
        </p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="actions">
          <button className="signup-btn" onClick={handleSignUp}>SignUp</button>
          <p className="login-text">
            If you have an Account. <a href="/login" onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }} className="login-link">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;