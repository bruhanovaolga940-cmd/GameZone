import { clubs } from "../assets/helpers/ClubList.jsx";
import ClubCard   from "../assets/club/ClubCard.jsx";

const Clubs=()=> {
    return (
        <div className="container">

            
<h1 style={{ margin: "32px 0 24px" }}>
                Игровые клубы Красноярска</h1>
            {/* Рендерим карточку для каждого клуба */}
            <div className="clubs-grid">
                
                {clubs.map(club => (
                    <ClubCard key={club.id} 
                    club={club} 
                    id={club.id} 
                    name={club.name}
                    desc={club.desc}
                    address={club.address}
                    rating={club.rating}
                    isOpen={club.isOpen}
                    tag={club.tags}
                    price={club.price}
                    />
                ))}
            </div>

        </div>
    );
}

export default Clubs;