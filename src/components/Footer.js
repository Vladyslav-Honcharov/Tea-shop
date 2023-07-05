import React from "react";
import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIcon from "@mui/icons-material/Phone";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-copyright">© Tea for soul 2023</div>
      <div className="footer-helps">
        <div className="footer-helps_title">Зв’язатися з нами</div>
        <div className="footer-helps_icons">
          <a href="https://www.instagram.com" target="_blank">
            <InstagramIcon className="footer-icon" />
          </a>
          <a href="https://telegram.me" target="_blank">
            <TelegramIcon className="footer-icon" />
          </a>
          <a href="tel:123456789" target="_blank">
            <PhoneIcon className="footer-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
