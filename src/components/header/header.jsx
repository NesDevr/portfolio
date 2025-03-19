import React, { useState } from "react";
import "./header.css";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <header className="header">
            <nav className="nav container">
                <a href="#home" className="nav__logo">Nes</a>

                <div className={`nav__menu ${showMenu ? "show-menu" : ""}`}>
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" className="nav__link active-link">
                                <i className="uil uil-estate nav__icon"></i> Home
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link">
                                <i className="uil uil-user nav__icon"></i> About
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#skills" className="nav__link">
                                <i className="uil uil-file-alt nav__icon"></i> Skills
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#services" className="nav__link">
                                <i className="uil uil-briefcase-alt nav__icon"></i> Services
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#portfolio" className="nav__link">
                                <i className="uil uil-scenery nav__icon"></i> Portfolio
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link">
                                <i className="uil uil-message nav__icon"></i> Contact
                            </a>
                        </li>
                    </ul>

                 
                </div>

                {/* Menu Toggle Icon (☰) */}
{!showMenu && (
    <div className="nav__toggle" onClick={toggleMenu}>
        <i className="uil uil-apps"></i>
    </div>
)}

{/* Close Icon (X) */}
{showMenu && (
    <div className="nav__close" onClick={toggleMenu}>
        <i className="uil uil-times"></i>
    </div>
)}
            </nav>
        </header>
    );
};

export default Header;
