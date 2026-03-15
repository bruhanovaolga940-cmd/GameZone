import { useLocation, useNavigate } from "react-router-dom";

const useScrollToSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId, targetPath = "/") => {
    const isCurrentPage = location.pathname === targetPath;

    if (isCurrentPage) {
      // ✅ Мы уже на нужной странице — просто скроллим
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // ✅ Переходим на нужную страницу с хэшем
      navigate(`${targetPath}#${sectionId}`);
    }
  };

  return scrollToSection;
};

export default useScrollToSection;