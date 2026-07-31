import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clubs } from "../assets/helpers/ClubList.jsx";
import adressicon from "../assets/img/address.svg"
import phone from "../assets/img/phone.svg"
import www from "../assets/img/www.svg"
import { FavBtn } from "../assets/components/favBtn/FavBtn.jsx";

const ClubDetailPage=()=> {
    const { id }      = useParams();
    const navigate    = useNavigate();
    const club = clubs.find(c => c.id === Number(id));

    const [activeImg, setActiveImg] = useState(null);

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

    const galleryImages = Array.isArray(club.gallery)
        ? club.gallery
        : [club.gallery];

    return (
        <div className="club-detail">
            {/* hero */}
            <div className="club-hero">
                <h1>{club.name}</h1>
                <div className="club-meta-detail">
                    <div className="rating">
                        <span className="stars">★</span>
                        <span className="rating-value middle-text">{club.rating}</span>
                    </div>
                    <div className="club-tags">
                        {club.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                    <span class="price middle-text">{club.price}</span>
                </div>
                <div className="fav">
                    <FavBtn club={club} />
                </div>
            </div>

            {/* mainPage */}
            <div className="club-detail-main">

                <div className="container">
                    <h2>Информация</h2>

                    <div className="info">
                        <div className="info-block">
                        <div className="info-icon"><img src={adressicon} />
                        </div>
                        <div className="info-block-text">
                            <p className="info-title small-text">Адрес</p>
                            <p>{club.address}</p>
                        </div>
                    </div>

                     <div className="info-block">
                        <div className="info-icon"><img src={phone} />
                        </div>
                        <div className="info-block-text">
                            <p className="info-title small-text ">Телефон</p>
                            <p>{club.phone}</p>
                        </div>
                    </div>

                     <div className="info-block">
                        <div className="info-icon"><img src={www} />
                        </div>
                        <div className="info-block-text">
                            <p className="info-title small-text">Сайт</p>
                            <a href={club.site} target="__blank">{club.site}</a>
                        </div>
                    </div>
                    </div>

                    
                </div>

                <div className="block description">
                    <h2>Описание</h2>
                    <div className="desc">{club.desc}</div>
                </div>

                <div className="gallery">
                    {galleryImages.length > 0 && (
                    <div className="gallery">
                        <h2 className="mb-2">Галерея</h2>
                        <div className="gallery-grid">
                            {galleryImages.map((img, id) => (
                                <div
                                    key={id}
                                    className="gallery-item"
                                    onClick={() => setActiveImg(img)}>
                                    <img
                                        src={img}
                                        alt='...'/>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}
                </div>

                {activeImg && (
                <div
                    className="lightbox"
                    onClick={() => setActiveImg(null)}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <img src={activeImg} alt="Увеличенное фото" />
                        <button
                            className="lightbox-close"
                            onClick={() => setActiveImg(null)}
                        > ✕ </button>
                    </div>
                </div>
            )}

            </div>
        </div> 
    );
}

export default ClubDetailPage;