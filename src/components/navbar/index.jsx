import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("assets/profile.png");

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const user = response.data.user;
        if (user?.profilePicture) {
          setProfilePic(user.profilePicture);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch profile picture:", error);
      });
  }, [token]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  const handleProfileNavigation = () => {
    if (!token) {
      navigate("/login");
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
      return;
    }

    const decoded = parseJwt(token);
    const role = decoded?.role?.toLowerCase();

    switch (role) {
      case "admin":
        navigate("/admin-profile");
        break;
      case "checker":
        navigate("/checker-profile");
        break;
      default:
        navigate("/user-profile");
    }

    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  // Helper to check active route
  const isActive = (path) =>
    location.pathname === path
      ? "text-white bg-[#0A66C2] rounded-md px-4 py-2 font-bold"
      : "text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white rounded-md px-4 py-2 font-bold";

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 font-poppins p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <img
          src="assets/seekers-logo.png"
          alt="Seekers Logo"
          className="w-32 cursor-pointer"
          onClick={() => navigate("/home")}
        />

        {/* Desktop nav links */}
        <nav className="hidden lg:flex space-x-4 items-center">
          <div
            className={isActive("/home")}
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            🏠 Home
          </div>
          <div
            className={isActive("/create-form")}
            onClick={() => navigate("/create-form")}
            style={{ cursor: "pointer" }}
          >
            📝 Create Form
          </div>
          <div
            className={isActive("/io-document")}
            onClick={() => navigate("/io-document")}
            style={{ cursor: "pointer" }}
          >
            📄 IO Document
          </div>
          <div
            className={isActive("/my-forms")}
            onClick={() => navigate("/my-forms")}
            style={{ cursor: "pointer" }}
          >
            📁 My Researches
          </div>
        </nav>

        {/* Profile & Mobile menu toggle */}
        <div className="flex items-center space-x-4">
          {/* Profile image */}
          <div className="relative hidden lg:block">
            <img
              src={profilePic}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-[#0A66C2] cursor-pointer hover:scale-110 transition"
              onClick={toggleProfileMenu}
            />
            {profileMenuOpen && (
              <nav className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 text-center font-bold">
                <div
                  className="p-3 cursor-pointer hover:bg-[#0A66C2] hover:text-white"
                  onClick={handleProfileNavigation}
                >
                  Profile
                </div>
                <div
                  className="p-3 cursor-pointer hover:bg-[#0A66C2] hover:text-white"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </nav>
            )}
          </div>

          {/* Mobile menu icon */}
          <div
            className="lg:hidden text-3xl cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <RxCross1 /> : <GiHamburgerMenu />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden mt-4 px-4 space-y-4 font-bold text-center">
          <div
            className={isActive("/home") + " block"}
            onClick={() => navigate("/home")}
            style={{ cursor: "pointer" }}
          >
            🏠 Home
          </div>
          <div
            className={isActive("/create-form") + " block"}
            onClick={() => navigate("/create-form")}
            style={{ cursor: "pointer" }}
          >
            📝 Create Form
          </div>
          <div
            className={isActive("/io-document") + " block"}
            onClick={() => navigate("/io-document")}
            style={{ cursor: "pointer" }}
          >
            📄 IO Document
          </div>
          <div
            className={isActive("/my-forms") + " block"}
            onClick={() => navigate("/my-forms")}
            style={{ cursor: "pointer" }}
          >
            📁 My Researches
          </div>

          <div className="flex flex-col items-center relative mt-4">
            <img
              src={profilePic}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-[#0A66C2] cursor-pointer hover:scale-110 transition"
              onClick={toggleProfileMenu}
            />
            {profileMenuOpen && (
              <nav className="mt-2 bg-white rounded-md shadow-md w-full font-bold">
                <div
                  className="p-3 cursor-pointer hover:bg-[#0A66C2] hover:text-white text-center"
                  onClick={handleProfileNavigation}
                >
                  Profile
                </div>
                <div
                  className="p-3 cursor-pointer hover:bg-[#0A66C2] hover:text-white text-center"
                  onClick={handleLogout}
                >
                  Log Out
                </div>
              </nav>
            )}
          </div>
        </nav>
      )}
    </nav>
  );
}
