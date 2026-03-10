import "./hero.css"

const Hero = () => {
    return ( 
        <section class="hero">
            <div class="hero-glow"></div>
            <div class="container">
                <h1>Все <span class="glow-text">игровые клубы</span><br />твоего города</h1>
                <p class="hero-desc">
                    Находи лучшие компьютерные клубы рядом, читай отзывы
                    и выбирай идеальное место для игр
                </p>
                <div class="hero-btns">
                    <a href="#clubs" class="btn btn-primary btn-lg">Смотреть клубы →</a>
                    <a href="#suggest" class="btn btn-ghost btn-lg">Предложить место</a>
                </div>
            </div>
        </section>
     );
}
 
export default Hero;