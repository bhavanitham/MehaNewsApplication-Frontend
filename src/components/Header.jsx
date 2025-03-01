import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import countries from "./countries";
import downArrow from './../assets/downarrow.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faUser , faBell} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


function Header() { 
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [theme, setTheme] = useState("light-theme");
  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology","politics"]
  useEffect(() => {
    document.body.className = theme;   
  }, [theme])
  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme")
    }
    else {
      setTheme("light-theme")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <header className="">
     <nav className="fixed top-0 left-0 w-full h-auto bg-[#fff] z-10 flex items-center justify-around">
      
      <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5 text-red-600">MEHA NEWS</h3>

        <ul className={active ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active" : " nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"}>
          <li><Link className="no-underline font-semibold hover:text-red-600" to="/" onClick={() => { setActive(!active) }}>All News</Link></li>
          <li className="dropdown-li"><Link className="no-underline font-semibold hover:text-red-600 flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!showCategoryDropdown); setShowCountryDropdown(false) }}>Top-Headlines <FontAwesomeIcon className={showCategoryDropdown ? "down-arrow-icon down-arrow-icon-active" : "down-arrow-icon"} icon={faCircleArrowDown} /></Link>

            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => {
                return (
                  <li key={index} onClick={() => { setShowCategoryDropdown(!showCategoryDropdown) }}>

                    <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize font-semibold hover:text-red-600" type="btn"
                      onClick={() => {
                        setActive(!active)
                      }}>
                      {element}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
        
        {token ? (
          <>
            <Link to="/login" onClick={handleLogout}>
              <span className="bg-red-600 px-4 py-2 rounded text-white font-semibold hover:text-red-600">Logout</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} />
              <span className="font-semibold hover:text-red-600">Profile</span>
            </Link>
            <Link to="/notificationbyid" className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBell} />
              <span className="font-semibold hover:text-red-600">Notification</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login"><span className="font-semibold hover:text-red-600">Login</span></Link>
            <Link to="/register"><span className="font-semibold hover:text-red-600">Register</span></Link>
          </>
        )}

        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;