import { useState, useRef, useEffect } from "react";
import "./navbar.css"; // Corrected import path
import seekersLogo from "/assets/seekers-logo.png"; // Ensure the file exists in assets

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo-container">
          <img src={seekersLogo || "/placeholder.svg"} alt="Seekers Logo" className="logo" />
        </div>

        <div className="nav-links">
          <a href="/" className="nav-link home-link">
            <i className="nav-icon home-icon"></i>
            Home
          </a>
          <a href="/create-form" className="nav-link">
            <i className="nav-icon create-icon"></i>
            Create Form
          </a>
          <a href="/io-document" className="nav-link">
            <i className="nav-icon document-icon"></i>
            IO Document
          </a>
          <a href="/my-researches" className="nav-link">
            <i className="nav-icon research-icon"></i>
            My Researches
          </a>
        </div>

        <div className="nav-profile-container" ref={dropdownRef}>
          <div className="nav-profile-icon" onClick={toggleDropdown}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nav-gnB7w0GUZfUbu6SrlK2K4clSIBOYwu.png"
              alt="Profile"
              className="avatar"
            />
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <a href="/user_profile" className="dropdown-item">Profile</a>
              <a href="/login" className="dropdown-item">SignOut</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
