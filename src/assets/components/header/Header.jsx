import { NavLink } from "react-router-dom";

import img from "../header/logo2.png";
import "../header/header.css";





const Header = () => {



    return ( 
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <NavLink to="/" className="logo">
                        <div className="logo-icon"><img src={img} /></div>
                        <div className="logo-text">
                            <span className="logo-title">GameZone</span>
                            <span className="logo-sub small-text">Красноярск</span>
                        </div>
                    </NavLink>

                    <nav className="header-nav">
                        <a href="#clubs" className="nav-link active">Клубы</a>
                        <a href="#suggest" className="nav-link">Предложить место</a>
                        <a href="#about" className="nav-link">О проекте</a>
                    </nav> 

                    <div className="header-actions">
                        <div id="guestActions">
                            <NavLink to="/Login" className="btn btn-outline btn-sm" >
                                Войти
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
     )
}
 
export default Header;