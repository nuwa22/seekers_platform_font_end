import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-white p-4 text-blue-700 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        {/* Logo */}
        <img
          src="assets/seekers-logo.png"
          alt="Seekers Logo"
          className="w-36 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 font-bold items-center">
          <li>
            <button
              onClick={() => navigate("/")}
              className="flex items-center border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:scale-110 transition"
            >
              🏠 Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/create-form")}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition"
            >
              📝 Create Form
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/io-document")}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition"
            >
              📄 IO Document
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/my-researches")}
              className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition"
            >
              📁 My Researches
            </button>
          </li>
        </ul>

        {/* Avatar (visible on large screen) */}
        <div className="hidden lg:block relative">
          <img
            src="assets/profile.png"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border-2 border-blue-700 hover:scale-110 transition cursor-pointer"
            onClick={toggleProfileMenu}
          />
          {isProfileMenuOpen && (
            <ul className="absolute right-0 mt-5 bg-white rounded-b-[10px] shadow-md w-40 text-center">
              <li
                className="px-4 py-2 hover:bg-blue-700 hover:text-white cursor-pointer font-bold"
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
              <li
                className="px-4 py-2 hover:bg-blue-700 hover:text-white cursor-pointer rounded-b-[10px] font-bold"
                onClick={() => navigate("/login")}
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
                onClick={() => navigate("/")}
                className="flex items-center border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:scale-102 transition w-full"
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/create-form")}
                className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-102 transition w-full"
              >
                📝 Create Form
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/io-document")}
                className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-102 transition w-full"
              >
                📄 IO Document
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/my-researches")}
                className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-102 transition w-full"
              >
                📁 My Researches
              </button>
            </li>
          </ul>

          {/* Avatar below menu on small screens */}
          <div className="flex flex-col items-center mt-4 relative">
            <img
              src="assets/profile.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-700 hover:scale-110 transition cursor-pointer"
              onClick={toggleProfileMenu}
            />
            {isProfileMenuOpen && (
              <ul className="mt-2 bg-white rounded-md shadow-md w-full text-center">
                <li
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer hover:text-white rounded-md"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer hover:text-white rounded-md"
                  onClick={() => navigate("/login")}
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
