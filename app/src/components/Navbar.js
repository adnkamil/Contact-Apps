import React, { useEffect } from "react";

export default () => {
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
            <a href="#landing-page">
              Co<span>apps</span>
            </a>
          </div>
          <ul className="menu mb-0">
            <li>
              <a href="#landing-page">Home</a>
            </li>
            <li>
              <a href="#about">Contacts</a>
            </li>
          </ul>
          {/* <div className="menu-btn">
                    <i className="fas fa-bars"></i>
          </div> */}
        </div>
      </nav>
    </>
  );
};
