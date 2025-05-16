import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

// JWT Token parser
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
  } catch (e) {
    console.error('Invalid token', e);
    return null;
  }
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleProfileNavigation = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
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
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 text-[#0A66C2] shadow-md fixed top-0 left-0 w-full z-50 font-[poppins]">
      <div className="flex justify-between items-center container mx-auto">
        {/* Logo */}
        <img
          src="assets/seekers-logo.png"
          alt="Seekers Logo"
          className="w-32 cursor-pointer"
          onClick={() => navigate("/home")}
        />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 font-bold items-center">
          <li>
            <button
              onClick={() => navigate("/home")}
              className="border-2 border-[#0A66C2] text-[#0A66C2] px-4 py-2 rounded-md hover:scale-110 transition"
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/create-form")}
              className="bg-[#0A66C2] text-white px-4 py-2 rounded-md border-2 border-[#0A66C2] hover:bg-transparent hover:text-[#0A66C2] hover:scale-110 transition"
            >
              📝 Create Form
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/io-document")}
              className="bg-[#0A66C2] text-white px-4 py-2 rounded-md border-2 border-[#0A66C2] hover:bg-transparent hover:text-[#0A66C2] hover:scale-110 transition"
            >
              📄 IO Document
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/my-forms")}
              className="bg-[#0A66C2] text-white px-4 py-2 rounded-md border-2 border-[#0A66C2] hover:bg-transparent hover:text-[#0A66C2] hover:scale-110 transition"
            >
              📁 My Researches
            </button>
          </li>
        </ul>

        {/* Profile Image (Desktop) */}
        <div className="hidden lg:block relative">
          <img
            src="assets/profile.png"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-[#0A66C2] hover:scale-110 transition cursor-pointer"
            onClick={toggleProfileMenu}
          />
          {isProfileMenuOpen && (
            <ul className="absolute right-0 mt-4 bg-white rounded-md shadow-md w-40 text-center">
              <li
                className="px-4 py-2 hover:bg-[#0A66C2] hover:text-white cursor-pointer font-bold"
                onClick={handleProfileNavigation}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-[#0A66C2] hover:text-white cursor-pointer font-bold"
                onClick={handleLogout}
              >
                LogOut
              </li>
            </ul>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden text-3xl cursor-pointer" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <RxCross1 /> : <GiHamburgerMenu />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 px-4 space-y-4 font-bold">
          <ul className="flex flex-col space-y-4">
            <li>
              <button
                onClick={() => navigate("/home")}
                className="border-2 border-[#0A66C2] text-blue-700 px-4 py-2 rounded-md hover:scale-102 transition w-full"
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/create-form")}
                className="bg-[#0A66C2] text-white px-4 py-2 rounded-md border-2 border-[#0A66C2] hover:bg-transparent hover:text-[#0A66C2] hover:scale-102 transition w-full"
              >
                📝 Create Form
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/io-document")}
                className="bg-[#0A66C2] text-white px-4 py-2 rounded-md border-2 border-[#0A66C2] hover:bg-transparent hover:text-[#0A66C2] hover:scale-102 transition w-full"
              >
                📄 IO Document
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/my-researches")}
                className="bg-[#0A66C2] text-white px-4 py-2 rounded-md border-2 border-[#0A66C2] hover:bg-transparent hover:text-[#0A66C2] hover:scale-102 transition w-full"
              >
                📁 My Researches
              </button>
            </li>
          </ul>

          {/* Mobile Profile Dropdown */}
          <div className="flex flex-col items-center mt-4 relative">
            <img
              src="assets/profile.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-[#0A66C2] hover:scale-110 transition cursor-pointer"
              onClick={toggleProfileMenu}
            />
            {isProfileMenuOpen && (
              <ul className="mt-2 bg-white rounded-md shadow-md w-full text-center">
                <li
                  className="px-4 py-2 hover:bg-[#0A66C2] hover:text-white cursor-pointer font-bold"
                  onClick={handleProfileNavigation}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#0A66C2] hover:text-white cursor-pointer font-bold"
                  onClick={handleLogout}
                >
                  LogOut
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
