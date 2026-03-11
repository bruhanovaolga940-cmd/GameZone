import { NavLink } from "react-router-dom";
import "../club/club.css";

 const ClubCard=({id, name})=> {

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

        
        <NavLink to={`/ClubDetailPage/${id}`}>
            
                <h1>{name}</h1>
        </NavLink>
    )
}
export default ClubCard;