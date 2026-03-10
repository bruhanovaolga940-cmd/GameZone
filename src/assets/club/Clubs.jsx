import { useNavigate } from "react-router-dom";
import "../club/club.css";

function ClubCard({ club }) {
    const navigate = useNavigate();

    // При клике переходим на страницу клуба
    const handleClick = () => {
        navigate(`/club/${club.id}`);
    };

    return (
        // <div className="club-card" onClick={handleClick}>

        //     <div className="club-card-body">

        //         <h3 className="club-name">{club.name}</h3>
        //         <div className="club-address">{club.address}</div>
        //         <p className="club-desc">{club.desc}</p>

        //         <div className="club-meta">
        //             <div className="rating">
        //                 <span style={{ color: "var(--star)" }}>★</span>
        //                 <span className="rating-value">{club.rating}</span>
        //             </div>
        //             <span className={`badge ${club.isOpen ? "badge-open" : "badge-closed"}`}>
        //                 {club.isOpen ? "● Открыто" : "● Закрыто"}
        //             </span>
        //         </div>

        //         <div className="club-tags">
        //             {club.tags.map(tag => (
        //                 <span key={tag} className="tag">{tag}</span>
        //             ))}
        //         </div>

        //     </div>


        <div class="club-card" nClick={handleClick}>
            <div class="club-card-image">
                <span class="club-card-icon">{club.icon}</span>
                <div class="card-badges">
                    <span className={`badge ${club.isOpen ? "badge-open" : "badge-closed"}`}>
                    {club.isOpen ? "● Открыто" : "● Закрыто"}
                </span>
                    <span class="badge badge-new">Новинка</span>
                </div>
                <button class="fav-btn" id="fav-1" onClick="" title="В избранное">♡</button>
            </div>
            <div class="club-card-body">
                <div class="club-name">{club.name}</div>
                <div className="club-address">{club.address}</div>
                <div class="club-meta">
                    <div className="rating">
                        <span style={{ color: "var(--star)" }}>★</span>
                        <span className="rating-value">{club.rating}</span>
                        <span class="rating-count">{club.reviewsCount}</span>
                    </div>
                        <span class="price">{club.price}</span>
                </div>

                    <div className="club-tags">
                    {club.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>))}
                </div>

             </div>
             </div>
    );
}

export default ClubCard;