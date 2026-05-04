import React from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useState } from "react";
import  useSrollToSection from "../../utilites/UseScrollToSection.jsx";
import img from "../../img/logo2.png";
import logoutBtn from "../../img/logout.svg";
import styles from "./Header.module.css";



const NAV_ITEMS = [
  { id: "clubs",     label: "Клубы"  },
  { id: "about",    label: "О проекте"    },
  { id: "suggest", label: "Обратная связь" },
];



const Header = () => {
     
    const scrollToSection = useSrollToSection();

    const { user, isAuth, logout, loading } = useAuth();

    const [activeId, setActiveId] = useState(null);

    const handleClick = (id, path) => {
    setActiveId(id);           
    scrollToSection(id, path); 
  };

  const handleLogout = async () => {
    await logout(); 
  };

    return ( 
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <NavLink to="/" className={styles.logo}>
                        <div className={styles.logoicon}><img src={img} /></div>
                        <div className={styles.logotext}>
                            <span className={styles.logotitle}>GameZone</span>
                            <span className="logo-sub small-text">Красноярск</span>
                        </div>
                    </NavLink>

                    <nav className={styles.headernav}>
                        {NAV_ITEMS.map((item) => (
                        <button
                        key={item.id} 
                        onClick={() => handleClick(item.id, "/")}
                        className={`${styles.btnLink} 
                        ${activeId === item.id ? styles.active : ""}`}>{item.label}</button>
                        ))}
                    </nav> 


                {loading ? null : (
                isAuth ? (
                <div
                  id="authActions"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <NavLink to="/profile" className="btn btn-outline btn-sm">

                    {user?.name}
                  </NavLink>

                  <button
                    onClick={handleLogout} className={styles.btn}> <img src={logoutBtn} className={styles.logoutBtn}/></button>
                </div>

              ) : (
                    <div className={styles.headeractions}>
                        <div id="guestActions">
                            <NavLink to="/Login" className="btn btn-outline btn-sm" >
                                Войти
                            </NavLink>
                        </div>
                    </div>
              )
            )}
                </div>
            </div>
        </header>
     )
}
 
export default Header;