import { NavLink} from "react-router-dom";
import { useState } from "react";
import  useSrollToSection from "../../utilites/UseScrollToSection.jsx";
import img from "../../img/logo2.png";
import styles from "./Header.module.css";


const NAV_ITEMS = [
  { id: "clubs",     label: "Клубы"  },
  { id: "about",    label: "О проекте"    },
  { id: "contacts", label: "Контакты" },
];



const Header = () => {
     
    const scrollToSection = useSrollToSection();

    const [activeId, setActiveId] = useState(null);

    const handleClick = (id, path) => {
    setActiveId(id);           // ✅ запоминаем какую кнопку нажали
    scrollToSection(id, path); // ✅ скроллим к секции
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

                    <div className={styles.headeractions}>
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