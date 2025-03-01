import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowDown, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Header() {
  const [active, setActive] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [theme, setTheme] = useState("light-theme");

  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-[#fff] z-10 flex items-center justify-between p-4">
        <h3 className="font-bold text-2xl text-red-600">MEHA NEWS</h3>

        {/* Navigation Menu */}
        <ul className={active ? "nav-ul flex flex-col gap-5 md:gap-14 md:flex-row md:justify-end active" : "nav-ul flex flex-col md:flex-row gap-14 md:justify-end"}>
          <li><Link className="no-underline font-semibold hover:text-red-600" to="/" onClick={() => setActive(!active)}>All News</Link></li>
          <li className="dropdown-li">
            <Link className="no-underline font-semibold hover:text-red-600 flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); }}>
              Top-Headlines <FontAwesomeIcon icon={faCircleArrowDown} />
            </Link>
            <ul className={showCategoryDropdown ? "dropdown show-dropdown" : "dropdown"}>
              {category.map((element, index) => (
                <li key={index}>
                  <Link to={`/top-headlines/${element}`} className="flex gap-3 capitalize font-semibold hover:text-red-600" onClick={() => setActive(!active)}>
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          
          {/* Desktop Menu Links */}
          <li className="hidden md:block">
            {token ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="font-semibold hover:text-red-600">Profile</span>
                </Link>
                <Link to="/notificationbyid" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBell} />
                  <span className="font-semibold hover:text-red-600">Notification</span>
                </Link>
                <Link to="/login" onClick={handleLogout}>
                  <span className="bg-red-600 px-4 py-2 rounded text-white font-semibold hover:text-red-600">Logout</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login"><span className="font-semibold hover:text-red-600">Login</span></Link>
                <Link to="/register"><span className="font-semibold hover:text-red-600">Register</span></Link>
              </div>
            )}
          </li>

          {/* Hamburger Menu Links - Login/Register or Profile/Notification/Logout */}
          <li className="md:hidden">
            {token ? (
              <div className="flex flex-col gap-4">
                <Link to="/profile" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} />
                  <span onClick={() => setActive(!active)} className="font-semibold hover:text-red-600">Profile</span>
                </Link>
                <Link to="/notificationbyid" className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBell} />
                  <span onClick={() => setActive(!active)} className="font-semibold hover:text-red-600">Notification</span>
                </Link>
                <Link to="/login" onClick={handleLogout}>
                  <span  
                  onClick={() => setActive(!active)}className="bg-red-600 px-4 py-2 rounded text-white font-semibold hover:text-red-600">Logout</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login"><span onClick={() => setActive(!active)} className="font-semibold hover:text-red-600">Login</span></Link>
                <Link to="/register"><span onClick={() => setActive(!active)} className="font-semibold hover:text-red-600">Register</span></Link>
              </div>
            )}
          </li>
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className={active ? "ham-burger ham-open" : "ham-burger"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;