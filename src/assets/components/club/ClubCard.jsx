import { NavLink } from "react-router-dom";
import "./club.css";

 const ClubCard=({id, name, desc, address, rating, isOpen, tag, price, img})=> {

    return (
        <NavLink to={`/ClubDetailPage/${id}`}>

            <div className="club-card">
                <div className={`badge ${isOpen ? "badge-open" : "badge-closed"}`}>
                    <p className={`middle-text ${isOpen ? "badge-open" : "badge-closed"}`}>{isOpen ? "● Открыто" : "● Закрыто"}</p>
                </div>

                <div className="club-card-body">
                    <h3 className="club-name">{name}</h3>
                    <div className="club-address middle-text">{address}</div>
                    <div className="card-img"><img src={img} alt="..."></img></div>
                    <span class="price">{price}</span>

                    <div className="club-meta">

                        <div className="rating">
                            <span className="stars">★</span>
                            <span className="rating-value middle-text">{rating}</span>
                        </div>
                        <div className="club-tags">
                            {tag.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>

                    </div>

                    
                </div>
            </div>
        </NavLink>
    )
}
export default ClubCard;