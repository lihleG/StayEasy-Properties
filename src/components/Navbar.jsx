import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { assets } from "../assets/assets";

const Navbar = () => {
  const [showMobile, setShowMobileMenu] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (showMobile) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [showMobile]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.logo} alt="" className="w-24 h-auto" />
        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-7 text-white">
          <li>
            <Link to="/" className="cursor-pointer hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="cursor-pointer hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/PropertiesPage" className="cursor-pointer hover:text-gray-400">
              Properties
            </Link>
          </li>
          <li>
            <a href="#Testimonials" className="cursor-pointer hover:text-gray-400">
              Testimonials
            </a>
          </li>
        </ul>
        <button
          className="hidden md:block bg-white px-8 py-2 rounded-full"
          onClick={() => navigate("/auth")} // Redirect to /auth
        >
          Sign up
        </button>
        <img
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt=""
          onClick={() => setShowMobileMenu(true)}
        />
      </div>
      {/* Mobile navigation */}
      <div
        className={`md:hidden ${
          showMobile ? "fixed w-full" : "h-0 w-0"
        } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer" onClick={() => setShowMobileMenu(false)}>
          <img src={assets.cross_icon} className="w-6" alt="" />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              to="/"
              className="px-4 rounded-full inline-block"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              to="/about"
              className="px-4 rounded-full inline-block"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              to="/PropertiesPage"
              className="px-4 rounded-full inline-block"
            >
              Properties
            </Link>
          </li>
          <li>
            <a
              onClick={() => setShowMobileMenu(false)}
              href="#Testimonials"
              className="px-4 rounded-full inline-block"
            >
              Testimonials
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;





