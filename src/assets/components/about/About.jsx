import "../about/about.css" ;

const About = () => {
    return ( 
        <div  className="container about-section">
            <div  className="about-inner">
                <div  className="hero-eyebrow">О проекте</div>
                <h2>GameZone Krasnoyarsk</h2>
                <p className="middle-text">Независимый каталог компьютерных и игровых клубов Красноярска.
                    Мы собираем актуальную информацию, чтобы ты мог быстро найти
                    лучшее место для игр — рядом с домом или работой.</p>
                <div  className="about-cards">
                    <div  className="about-card">
                        <div  className="about-card-icon">🗂</div>
                        <h4>Актуальная база</h4>
                        <p>Регулярно обновляем данные о клубах, часах работы и ценах</p>
                    </div>
                    <div  className="about-card">
                        <div  className="about-card-icon">⭐</div>
                        <h4>Реальные отзывы</h4>
                        <p>Только проверенные отзывы от зарегистрированных пользователей</p>
                    </div>
                    <div  className="about-card">
                        <div  className="about-card-icon">🤝</div>
                        <h4>Сообщество</h4>
                        <p>Помогай развивать базу — предлагай новые места и дополняй информацию</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default About;