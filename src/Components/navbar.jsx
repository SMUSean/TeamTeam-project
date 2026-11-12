
/**
 * @file Navbar.jsx
 * @description A React functional component that serves as the navigation
 * bar for the application, including dark mode toggle, navigation links,
 * and social media integration.
 * The component also includes a weather widget and responsive design.
 *
 * @module Navbar
 *
 * @author Raish Raj Joshi, Tania Terence, Freddy Rideout, Lee Jonah
 */

import { useRef, useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaUser,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import {
  Link,
  useMatch,
  useResolvedPath,
  useNavigate,
} from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import Weather from "./Weather";

/**
 * Navbar Component
 * @description Displays a responsive navigation bar with dark mode toggle,
 * weather widget, and links to application pages.
 * Includes a mobile-friendly menu and tooltips.
 *
 * @returns {JSX.Element} The Navbar component.
 *
 * @author Raish Raj Joshi
 */
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const navRef = useRef();
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  // Default coordinates for St. Margarets Bay area
  const DEFAULT_LATITUDE = 44.694267;
  const DEFAULT_LONGITUDE = -63.911099;

  // Side effects for toggling dark mode and setting default location
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setLocation({
      lat: DEFAULT_LATITUDE,
      lon: DEFAULT_LONGITUDE,
    });
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to show/hide responsive navigation menu
  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };

  return (
    <div>
      {/* Header Container */}
      <header className="flex items-center justify-between h-20 px-6 bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text transition-colors duration-300 z-9999">

        {/* Weather Widget */}
        <div className="text-light-primary dark:text-dark-primary flex items-center space-x-2">
          {location.lat !== null && location.lon !== null ? (
            <Weather lat={location.lat} lon={location.lon} />
          ) : (
            <p>Loading weather...</p>
          )}
        </div>

        {/* Navigation Links */}
        <nav
          ref={navRef}
          className="flex flex-col lg:flex-row gap-y-2 gap-x-6 fixed lg:relative inset-0 lg:inset-auto lg:w-auto items-center justify-center bg-light-background dark:bg-dark-background lg:bg-transparent dark:lg:bg-transparent z-50"
        >
          <CustomLink to="/" showNavbar={showNavbar}>
            Home
          </CustomLink>

          <CustomLink to="/about" showNavbar={showNavbar}>
            About
          </CustomLink>

          <CustomLink to="/ecosystem" showNavbar={showNavbar}>
            Ecosystem
          </CustomLink>

          <CustomLink to="/gallery" showNavbar={showNavbar}>
            Gallery
          </CustomLink>

          <CustomLink to="/faunaflorafunga" showNavbar={showNavbar}>
            Fauna/Flora/Funga
          </CustomLink>

          <CustomLink to="/NaturalBurial" showNavbar={showNavbar}>
            Natural Burial
          </CustomLink>

          <CustomLink to="/contacts" showNavbar={showNavbar}>
            Contact
          </CustomLink>

          <CustomLink to="/ecommerce" showNavbar={showNavbar}>
            eCommerce
          </CustomLink>

          <CustomLink to="/sitemap" showNavbar={showNavbar}>
            Site Map
          </CustomLink>

          {/* Mobile Menu Close Button */}
          <button
            className="nav-btn nav-close-btn text-light-primary dark:text-dark-primary lg:hidden"
            onClick={showNavbar}
          >
            <FaTimes size={28} />
          </button>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">

          {/* Dark Mode Toggle Button */}
          <button
            data-testid="darkmode-toggle"
            className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-full text-light-text dark:text-dark-text flex items-center justify-center transition-all duration-300 hover:scale-110"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <BsSunFill size={24} />
            ) : (
              <FaMoon size={24} />
            )}
          </button>

          {/*
            User Icon - Login Navigation

            Clicking this icon navigates to the frontend login page.

            TODO: When backend authentication is implemented,
            update this control to reflect the user's login status
            and provide access to account/logout functionality.
          */}
          <div className="relative">
            <Link
              to="/login"
              aria-label="Log in"
              className="group flex items-center justify-center w-12 h-12 bg-transparent cursor-pointer"
            >
              <FaUser
                size={28}
                className="text-light-primary dark:text-dark-primary"
              />

              {/* Login Tooltip */}
              <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black dark:bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                Log In
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile View: Hamburger Menu */}
        <button
          className="nav-btn lg:hidden text-light-primary dark:text-dark-primary hover:scale-110"
          onClick={showNavbar}
        >
          <FaBars size={28} />
        </button>
      </header>
    </div>
  );
}

/**
 * Footer Component
 * @description Displays a footer with social media links,
 * address, and copyright information.
 *
 * @returns {JSX.Element} The Footer component.
 *
 * @author Tania Terence
 */
function Footer() {
  return (
    <footer className="w-full h-[5%] bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text transition-colors duration-300 border-light-border dark:border-dark-border">

      {/* Social Media Links */}
      <div className="flex gap-4 place-items-baseline">

        {/* Facebook */}
        <a href="https://www.facebook.com/StMargaretsBayStewardshipAssociation/">
          <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
            <FaFacebook
              className="fill-[#1c1f26]"
              size={25}
            />
          </button>
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/stmargaretsbaysa/">
          <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
            <FaSquareInstagram
              className="fill-[#1c1f26]"
              size={25}
            />
          </button>
        </a>

        {/* YouTube */}
        <a href="https://www.youtube.com/watch?v=hhed9dEyfVU&list=PLsIXMc3B__c2jg_yjIN1E9HMuRwEnMMuS&pp=iAQB">
          <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
            <FaYoutube
              className="fill-[#1c1f26]"
              size={25}
            />
          </button>
        </a>

        {/* Address and Copyright */}
        <p className="flex text-[2.5vmin]">
          Head Of St Margarets Bay, NS B3Z 2C9
        </p>

        <p className="text-[2vmin]">
          &copy; 2026 SMU, CSCI 3428 Group27C
        </p>
      </div>
    </footer>
  );
}

/**
 * CustomLink Component
 * @description Creates navigation links with active state styling
 * and hover effects.
 *
 * @param {Object} props - Properties for the CustomLink component.
 * @returns {JSX.Element} A styled navigation link.
 *
 * @author Raish Raj Joshi
 */
function CustomLink({ to, children, showNavbar, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({
    path: resolvedPath.pathname,
    end: true,
  });

  const navigate = useNavigate();

  const handleClick = (e) => {
    // Close the responsive menu when a navigation link is clicked
    if (showNavbar) {
      showNavbar();
    }

    navigate(to);
  };

  return (
    <span
      className={`relative px-4 py-2 transition-all duration-200 ${
        isActive
          ? "bg-light-highlight dark:bg-dark-highlight text-white rounded-lg"
          : "text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
      } hover:scale-105 cursor-pointer`}
      onClick={handleClick}
      {...props}
    >
      {children}

      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-light-primary dark:bg-dark-primary transition-all duration-300 hover:w-full"></span>
    </span>
  );
}

export { Footer, Navbar };
