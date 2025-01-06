import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 ">
      {/* Logo */}
      <div className="text-3xl font-bold text-gray-800">Laporpak.</div>
      {/* Navigation Links for Large Screens */}
      <div className="hidden md:flex space-x-6">
      </div>
      {/* Hamburger Menu Button for Medium and Smaller Screens */}
      <div className="md:hidden flex items-center">
        <button
          className="text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      {/* Button */}
      <button
        className="hidden md:block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate("/newlaporan")}
      >
        Laporkan Masalah Anda
      </button>
      {/* Dropdown Menu for Hamburger */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-lg rounded-md p-4 space-y-4 md:hidden z-50">
          <a href="#contac" className="text-gray-600 hover:text-blue-600">
            Customer Servis
          </a>
          <button
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate("/newlaporan")}
          >
            Laporkan Masalah Anda
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
