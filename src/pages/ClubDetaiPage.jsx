import { useParams, useNavigate } from "react-router-dom";
import { clubs } from "../assets/helpers/ClubList.jsx";

function ClubDetailPage() {
    const { id }      = useParams();
    const navigate    = useNavigate();

    // Ищем клуб по id
    // id из useParams — строка, club.id — число, поэтому Number(id)
    const club = clubs.find(c => c.id === Number(id));

    // Если клуб не найден
    if (!club) {
        return (
            <div className="container" style={{ padding: "60px 0", textAlign: "center" }}>
                <h2>Клуб не найден</h2>
                <button
                    className="btn btn-primary"
                    style={{ marginTop: "20px" }}
                    onClick={() => navigate("/")}
                >
                    ← Вернуться к списку
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: "40px 0" }}>

            {/* Кнопка назад */}
            <button
                className="btn btn-ghost btn-sm"
                style={{ marginBottom: "28px" }}
                onClick={() => navigate(-1)}
            >
                ← Назад
            </button>

            {/* Полная информация о клубе */}
            <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "32px",
            }}>

                {/* Шапка */}
                <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <h1 style={{ fontSize: "1.8rem" }}>{club.name}</h1>
                        <span className={`badge ${club.isOpen ? "badge-open" : "badge-closed"}`}>
                            {club.isOpen ? "● Открыто" : "● Закрыто"}
                        </span>
                    </div>

                    <div className="rating" style={{ gap: "6px" }}>
                        <span style={{ color: "var(--star)", fontSize: "1.1rem" }}>★</span>
                        <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>{club.rating}</span>
                    </div>
                </div>

                <div className="divider" />

                {/* Детали */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                    <div>
                        <div className="info-label">Описание</div>
                        <p style={{ color: "var(--text-secondary)", marginTop: "6px" }}>
                            {club.description}
                        </p>
                    </div>

                    <div>
                        <div className="info-label">Адрес</div>
                        <div style={{ marginTop: "6px" }}>📍 {club.address}</div>
                    </div>

                    <div>
                        <div className="info-label">Телефон</div>
                        <div style={{ marginTop: "6px" }}>
                            <a href={`tel:${club.phone}`}>{club.phone}</a>
                        </div>
                    </div>

                    <div>
                        <div className="info-label">Теги</div>
                        <div className="club-tags" style={{ marginTop: "8px" }}>
                            {club.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ClubDetailPage;