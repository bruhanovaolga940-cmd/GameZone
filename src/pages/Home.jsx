
import About from "../assets/components/about/About.jsx";
import Hero from "../assets/components/hero/Hero.jsx";
import Clubs from "./Clubs.jsx";

const Home = () => {
    return (
        <>
            <Hero />
            <section id="clubs"><Clubs /></section> 
            <section id="about"><About /></section>
            
        </>
    );
}
 
export default Home;