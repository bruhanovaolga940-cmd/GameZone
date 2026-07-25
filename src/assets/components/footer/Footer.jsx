import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import img from "../../img/logo2.png";
import heart from "../../img/heart.svg"

const Footer = () => {

    const { isAuth, loading } = useAuth();

    return ( 
       <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="#" class="logo">
                        <div class="logo-icon"><img src={img} /></div>
                        <div class="logo-text">
                            <span class="logo-title">GameZone</span>
                            <span class="logo-sub small-text">Красноярск</span>
                        </div>
                    </a>
                    <p>Независимый каталог игровых клубов Красноярска. Не являемся представителями каких-либо заведений.</p>
                </div>
                <div class="footer-col">
                    <h4>Навигация</h4>
                    <ul class="footer-links">
                        <li><a href="#clubs">Все клубы</a></li>
                        <li><a href="#suggest">Предложить место</a></li>
                        <li><a href="#about">О проекте</a></li>
                    </ul>
                </div>
                

                    {loading ? null : (
                isAuth ? ( 
                    
                    <div class="footer-col">
                        <h4>Аккаунт</h4>
                    <ul class="footer-links">
                        <li><NavLink to="/Profile">Профиль</NavLink></li>
                    </ul>
                    </div>
                    ) : (

                    <div class="footer-col">
                    <h4>Аккаунт</h4>
                    <ul class="footer-links">
                        <li><NavLink to="/Login">Войти</NavLink></li>
                        <li><NavLink to="/Registration">Регистрация</NavLink></li>
                    </ul> </div>

                        
                    )
                )}

                <div class="footer-col">
                    <h4>Контакты</h4>
                    <ul class="footer-links">
                        <li><a href="mailto:info@gamezone-krsk.ru">info@gamezone-krsk.ru</a></li>
                        <li><a href="#">ВКонтакте</a></li>
                        <li><a href="#">Telegram</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <span>&copy; 2026 GameZone Krasnoyarsk</span>
                <span style={{display: 'flex', alignItems: 'center'}}>Сделано с <img src={heart} className="heart"/> для геймеров Красноярска</span>
            </div>
        </div>
    </footer>
     );
}
 
export default Footer;