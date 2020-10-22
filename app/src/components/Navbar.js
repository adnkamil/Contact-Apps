import React, { useState, useEffect } from "react";

export default () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuButton = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const menu = document.getElementsByClassName("menu")
    if (isOpen) {
      menu[0].classList.add('active')
    } else {
      menu[0].classList.remove('active')
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const navbarNb = document.getElementsByClassName("navbar-nb");
      if (window.scrollY > 20) {
        navbarNb[0].classList.add("sticky-nb");
      } else {
        navbarNb[0].classList.remove("sticky-nb");
      }
    });
  });

  return (
    <>
      <nav className="navbar-nb">
        <div className="max-width">
          <div className="logo">
            <a href="#landing-page">Co<span>aps</span>.</a>
          </div>
          <ul className="menu mb-0">
            <li><a href="#landing-page">Home</a></li>
            <li><a href="#contact">Contacts</a></li>
          </ul>
          <div className="menu-btn">
            <i className="fas fa-bars" onClick={handleMenuButton}></i>
          </div>
        </div>
      </nav>
    </>
  );
};
