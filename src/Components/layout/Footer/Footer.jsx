import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="midFooter">
        <p>Copyrights 2024 &copy; Aashish Kushwah</p>
      </div>

      <div className="rightFooter">
        <a href="https://www.instagram.com/heart_hacker_ashu623/">Instagram</a>
        <a href="https://www.linkedin.com/in/aashish-kushwah-78367424b/">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
