import React from 'react'
import { FaTelegram } from "react-icons/fa6"
import { FaWhatsapp } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import './footer.scss'


const Footer = () => {
  return (
    <>
    <footer className="footer" id='/footer.htm'>
        <div className="footer__top"><h1 className="footer__heading">Bizimlə əlaqə</h1></div>
        <ul className="footer-cards">
            <li className="footer-cards__item footer-cards--telegram">
                <Link className="footer-cards__link">
                    <div className="footer-cards__logo">
                    <FaTelegram className="fab fa-telegram-plane" /> 
                    </div>
                    <h1 className="footer-cards__title">Telegram</h1>
                    <strong className="footer-cards__socials socials--telegram">telegram.org</strong>
                </Link>
            </li>
            <li className="footer-cards__item footer-cards--whatsapp">
                <Link className="footer-cards__link">
                    <div className="footer-cards__logo">
                    <FaWhatsapp className="fab fa-whatsapp"/>
                    </div>
                    <h1 className="footer-cards__title">WhatsApp</h1>
                    <strong className="footer-cards__socials socials--whatsapp">whatsapp.com</strong>
                </Link>
            </li>
            <li className="footer-cards__item footer-cards--instagram">
                <Link className="footer-cards__link">
                    <div className="footer-cards__logo">
                    <FaInstagram className="fab fa-instagram"/>
                    </div>
                    <h1 className="footer-cards__title">Instagram</h1>
                    <strong className="footer-cards__socials socials--instagram">instagram.com</strong>
                </Link>
            </li>
            <li className="footer-cards__item footer-cards--facebook">
                <Link className="footer-cards__link">
                    <div className="footer-cards__logo">
                    <FaFacebookF className="fab fa-facebook-f"/>
                    </div>
                    <h1 className="footer-cards__title">Facebook</h1>
                    <strong className="footer-cards__socials socials--facebook">facebook.com</strong>
                </Link>
            </li>
        </ul>
        <div className="footer__bottom">
            <ul className="footer-navigation">
                <li className="footer-navigation__item">
                    <Link className="footer-navigation__link"><i className="fa fa-home-lg-alt"></i> Ana Səhifə</Link>
                </li>
                <li className="footer-navigation__item">
                    <Link  className="footer-navigation__link"><i className="fa fa-file-invoice"></i> Xidmətlərimiz</Link>
                </li>
                <li className="footer-navigation__item">
                    <Link  className="footer-navigation__link"><i className="fa fa-books"></i> Üstünlüklərimiz</Link>
                </li>
                <li className="footer-navigation__item">
                    <Link  className="footer-navigation__link"><i className="fa fa-map-marker-question"></i> Haqqımızda</Link>
                </li>
                <li className="footer-navigation__item">
                    <Link  className="footer-navigation__link"><i className="fa fa-mobile"></i> Əlaqə</Link>
                </li>
            </ul>
            <hr/>
            <div className="footer-copyright">
                <p className="footer-copyright__content">All Rights Reserved | Baku GRAN_Groups <i
                        className="fal fa-copyright"></i> 2024</p>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer