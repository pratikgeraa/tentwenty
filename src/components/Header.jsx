import React, { useState } from "react";
import "../styles/header.css";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <nav className="navbar">
      <div className={`nav ${navActive ? "" : "active"}`}>
        <a href="#" className="nav-link">
          About
        </a>
        <a href="#" className="nav-link">
          News
        </a>
        <a href="#" className="nav-link">
          Services
        </a>
        <a href="#" className="nav-link">
          Team
        </a>
        <a href="#" className="nav-link">
          Enquiry
        </a>
      </div>
      <button className="btn hidden" onClick={toggleNav}>
        <span className="icon">{navActive ? "X" : "☰"}</span>
      </button>
      <div className="contact-btn">
        <button> ContactUs</button>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transform transition-transform duration-200 ease-in-out hover:translate-x-1"
        >
          <line x1="2" y1="12" x2="17" y2="12" />
          <polyline points="9 5 17 12 9 19" />
        </svg>
      </div>
    </nav>
  );
};

export default Header;
