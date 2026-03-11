import { useParams, useNavigate } from "react-router-dom";
import { clubs } from "../assets/helpers/ClubList.jsx";

const ClubDetailPage=()=> {
    const { id }      = useParams();
    const navigate    = useNavigate();
    const club = clubs.find(c => c.id === Number(id));

    // Ищем клуб по id
    // id из useParams — строка, club.id — число, поэтому Number(id)
    // const club = clubs.find(c => c.id === Number(id));

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
        <>
        <h1>{club.name}</h1>
        <p>{club.id}</p>
        </>
    );
}

export default ClubDetailPage;