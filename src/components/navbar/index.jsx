import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white p-4 text-blue-700 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        {/* Logo */}
        <img src="assets/seekers-logo.png" alt="Seekers Logo" className="w-36" />

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 font-bold items-center">
          <li>
            <a href="#" className="flex items-center border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:scale-110 transition">
              🏠 Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition">
              📝 Create Form
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition">
              📄 IO Document
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition">
              📁 My Researches
            </a>
          </li>
        </ul>

        {/* Avatar (visible on large screen) */}
        <div className="hidden lg:block">
        <img src="assets/profile.png" alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-blue-700 hover:scale-110 transition " />

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
              <a href="#" className="flex items-center border-2 border-blue-700 text-blue-700 px-4 py-2 rounded-md hover:scale-110 transition">
                🏠 Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition">
                📝 Create Form
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition">
                📄 IO Document
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center bg-blue-700 text-white px-4 py-2 rounded-md border-2 border-blue-700 hover:bg-transparent hover:text-blue-700 hover:scale-110 transition">
                📁 My Researches
              </a>
            </li>
          </ul>
          {/* Avatar below menu on small screens */}
          <div className="flex justify-center mt-4">
          <img src="assets/profile.png" alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-blue-700 hover:scale-110 transition" />
          </div>
        </div>
      )}
    </nav>
  );
}
