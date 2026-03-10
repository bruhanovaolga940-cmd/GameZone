import { clubs } from "../assets/helpers/ClubList.jsx";
import ClubCard   from "../assets/club/Clubs.jsx";

function Clubs() {
    return (
        <div className="container">

            <h1 style={{ margin: "32px 0 24px" }}>
                Игровые клубы Красноярска
            </h1>

            {/* Рендерим карточку для каждого клуба */}
            <div className="clubs-grid">
                {clubs.map(club => (
                    <ClubCard key={club.id} club={club} />
                ))}
            </div>

        </div>
    );
}

export default Clubs;