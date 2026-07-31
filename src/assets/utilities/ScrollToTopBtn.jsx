
import { useState, useEffect } from "react";
import "./ScrollToTopBtn.css";

function ScrollToTopBtn() {

    // Показываем кнопку только когда проскролили вниз
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {

        // Следим за скроллом
        const handleScroll = () => {
            if (window.scrollY > 300) {
                // проскролили больше 300px — показываем кнопку
                setIsVisible(true);
            } else {
                // вверху страницы — прячем кнопку
                setIsVisible(false);
            }
        };

        // Вешаем слушатель события скролла
        window.addEventListener("scroll", handleScroll);

        // Убираем слушатель когда компонент удаляется
        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    // Скролл наверх
    const scrollToTop = () => {
        window.scrollTo({
            top:      0,
            behavior: "smooth" // плавно
        });
    };

    return (
        // Показываем кнопку только если isVisible = true
        isVisible && (
            <button
                className="scroll-to-top"
                onClick={scrollToTop}
            >
                ↑
            </button>
        )
    );
}

export default ScrollToTopBtn;