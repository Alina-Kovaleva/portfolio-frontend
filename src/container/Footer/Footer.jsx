import React from "react";

import { images } from "../../constants";
import { AppWrap } from "../../wrapper";

import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <h2 className="head-text">
        Looking for a Developer? <span>Chat With Me</span>
      </h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:calipco.xp@gmail.com" className="p-text">
            GET IN TOUCH!
          </a>
        </div>
      </div>
    </>
  );
};

export default AppWrap(Footer, "contact", "app_whitebg");
