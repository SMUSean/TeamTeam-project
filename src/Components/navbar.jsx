/**
 * @file Navbar.jsx
 * @description Navigation bar with sliding active indicator pill, dark mode toggle,
 * weather widget, login/signup links, and responsive mobile drawer.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaUser,
  FaUserPlus,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import Weather from "./Weather";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faunaflorafunga", label: "Fauna/Flora/Funga" },
  { to: "/NaturalBurial", label: "Natural Burial" },
  { to: "/contacts", label: "Contact" },
  { to: "/ecommerce", label: "eCommerce" },
  { to: "/sitemap", label: "Site Map" },
];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [pillStyle, setPillStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();
  const navigate = useNavigate();

  const [coords, setCoords] = useState({
    lat: null,
    lon: null,
  });

  const DEFAULT_LATITUDE = 44.694267;
  const DEFAULT_LONGITUDE = -63.911099;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setCoords({
      lat: DEFAULT_LATITUDE,
      lon: DEFAULT_LONGITUDE,
    });
  }, [darkMode]);

  const updatePillPosition = useCallback(() => {
    const currentPath = location.pathname.toLowerCase();
    const matchedItem = NAV_ITEMS.find(
      (item) => item.to.toLowerCase() === currentPath
    );
    const activeEl = matchedItem ? itemRefs.current[matchedItem.to] : null;

    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  useEffect(() => {
    updatePillPosition();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updatePillPosition);
    }

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updatePillPosition)
        : null;

    if (observer && navRef.current) {
      observer.observe(navRef.current);
    }

    window.addEventListener("resize", updatePillPosition);
    return () => {
      window.removeEventListener("resize", updatePillPosition);
      if (observer) observer.disconnect();
    };
  }, [updatePillPosition]);

  const toggleDarkMode = () => {
    document.documentElement.classList.add("theme-transitioning");
    setDarkMode((prev) => !prev);
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 600);
  };

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };

  const handleNavClick = (to) => {
    if (navRef.current && navRef.current.classList.contains("responsive_nav")) {
      navRef.current.classList.remove("responsive_nav");
    }
    navigate(to);
  };

  return (
    <div>
      {/* Header Container */}
      <header className="w-full flex items-center justify-between h-20 px-4 xl:px-8 bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text transition-colors duration-300 z-50">
        {/* Weather Widget */}
        <div className="shrink-0 text-[#1e1326] dark:text-[#f0E68C] flex items-center">
          {coords.lat !== null && coords.lon !== null ? (
            <Weather lat={coords.lat} lon={coords.lon} />
          ) : (
            <p className="text-xs font-medium">Loading weather...</p>
          )}
        </div>

        {/* Navigation Links with Sliding Purple Pill */}
        <nav
          ref={navRef}
          className="relative flex flex-col lg:flex-row gap-y-2 gap-x-2 xl:gap-x-3.5 fixed lg:relative inset-0 lg:inset-auto lg:w-auto items-center justify-center bg-light-background dark:bg-dark-background lg:bg-transparent dark:lg:bg-transparent z-50"
        >
          {/* Sliding Active Indicator (Desktop) */}
          <span
            aria-hidden="true"
            style={{
              transform: `translate3d(${pillStyle.left}px, -50%, 0)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
            className="hidden lg:block absolute left-0 top-1/2 h-10 rounded-lg bg-[#6D3D86] dark:bg-dark-highlight shadow-md pointer-events-none will-change-[transform,width] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />

          {NAV_ITEMS.map(({ to, label }) => {
            const isActive =
              location.pathname.toLowerCase() === to.toLowerCase();
            return (
              <span
                key={to}
                ref={(el) => {
                  itemRefs.current[to] = el;
                }}
                onClick={() => handleNavClick(to)}
                className={`relative z-10 px-3.5 xl:px-4 py-2 text-[15px] xl:text-base font-semibold tracking-wide whitespace-nowrap rounded-lg transition-colors duration-200 select-none cursor-pointer ${
                  isActive
                    ? "bg-[#6D3D86] dark:bg-dark-highlight lg:bg-transparent dark:lg:bg-transparent text-white"
                    : "text-[#1e1326] dark:text-[#f0E68C] hover:bg-black/10 dark:hover:bg-white/10"
                }`}
              >
                {label}
              </span>
            );
          })}

          {/* Mobile Menu Close Button */}
          <button
            className="nav-btn nav-close-btn text-[#1e1326] dark:text-[#f0E68C] lg:hidden"
            onClick={showNavbar}
          >
            <FaTimes size={28} />
          </button>
        </nav>

        {/* Right Side Controls */}
        <div className="shrink-0 flex items-center space-x-2.5">
          {/* Dark Mode Toggle Button */}
          <button
            data-testid="darkmode-toggle"
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-full border border-[#1e1326]/25 dark:border-dark-border bg-white/25 dark:bg-dark-background text-[#1e1326] dark:text-[#f0E68C] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            onClick={toggleDarkMode}
          >
            <span
              className={`transform transition-transform duration-500 ${
                darkMode ? "rotate-180" : "rotate-0"
              }`}
            >
              {darkMode ? <BsSunFill size={18} /> : <FaMoon size={18} />}
            </span>
          </button>

          {/* Login Icon */}
          <div className="relative">
            <Link
              to="/login"
              aria-label="Log in"
              className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FaUser
                size={20}
                className="text-[#1e1326] dark:text-[#f0E68C] group-hover:scale-110 transition-transform"
              />
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-xs text-white bg-black dark:bg-gray-900 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                Log In
              </span>
            </Link>
          </div>

          {/* Signup Icon */}
          <div className="relative">
            <Link
              to="/signup"
              aria-label="Sign up"
              className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FaUserPlus
                size={20}
                className="text-[#1e1326] dark:text-[#f0E68C] group-hover:scale-110 transition-transform"
              />
              <span className="absolute top-full mt-2 right-0 text-xs text-white bg-black dark:bg-gray-900 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                Sign Up
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile View: Hamburger Menu */}
        <button
          className="nav-btn lg:hidden text-[#1e1326] dark:text-[#f0E68C] hover:scale-110"
          onClick={showNavbar}
        >
          <FaBars size={26} />
        </button>
      </header>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full h-[5%] bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text transition-colors duration-300 border-light-border dark:border-dark-border">
      <div className="flex gap-4 place-items-baseline">
        <a href="https://www.facebook.com/StMargaretsBayStewardshipAssociation/">
          <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
            <FaFacebook className="fill-[#1c1f26]" size={25} />
          </button>
        </a>
        <a href="https://www.instagram.com/stmargaretsbaysa/">
          <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
            <FaSquareInstagram className="fill-[#1c1f26]" size={25} />
          </button>
        </a>
        <a href="https://www.youtube.com/watch?v=hhed9dEyfVU&list=PLsIXMc3B__c2jg_yjIN1E9HMuRwEnMMuS&pp=iAQB">
          <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
            <FaYoutube className="fill-[#1c1f26]" size={25} />
          </button>
        </a>
        <p className="flex text-[2.5vmin]">
          Head Of St Margarets Bay, NS B3Z 2C9
        </p>
        <p className="text-[2vmin]">&copy; 2026 SMU, CSCI 3428 Group27C</p>
      </div>
    </footer>
  );
}

export { Footer, Navbar };
