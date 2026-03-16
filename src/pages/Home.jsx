import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import About from "../assets/components/about/About.jsx";
import Hero from "../assets/components/hero/Hero.jsx";
import Clubs from "./Clubs.jsx";
import Suggest from "../assets/components/suggest/Suggest.jsx";

const Home = () => {
     const location = useLocation();

      useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const section = document.getElementById(sectionId);

      if (section) {
        setTimeout(() => {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // небольшая задержка для рендера
      }
    }
  }, [location.hash]);

    return (
        <>
            <Hero />
            <section id="clubs"><Clubs /></section> 
            <section id="about"><About /></section>
            <section id="suggest"><Suggest /></section>
            
        </>
    );
}
 
export default Home;