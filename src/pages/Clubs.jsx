import { useState, useMemo } from "react";
import { clubs } from "../assets/helpers/ClubList.jsx";
import ClubCard   from "../assets/club/ClubCard.jsx";
import img from "../pages/poisk.png";

const Clubs=()=> {
    return (
        <div className="container">

            <section class="search-section">
                <div class="container">
                    <div class="search-bar">
                        <div class="search-input-wrap">
                            <span class="search-input-icon"><img src={img}></img></span>
                            <input type="text" id="mainSearch" placeholder="Найти клуб по названию или адресу..." oninput="filterClubs()" />
                        </div>
                        <select id="sortSelect" onChange="filterClubs()">
                            <option value="rating">По рейтингу</option>
                            <option value="name">По названию</option>
                            <option value="reviews">По отзывам</option>
                        </select>
                    </div>
                    {/* <div class="filter-row">
                        <span class="filter-label">Фильтры:</span>
                        <button class="filter-chip active" onclick="setFilter(this,'all')">Все</button>
                        <button class="filter-chip" onclick="setFilter(this,'open')">🟢 Открыто</button>
                        <button class="filter-chip" onclick="setFilter(this,'vr')">🥽 VR</button>
                        <button class="filter-chip" onclick="setFilter(this,'ps')">🎮 PlayStation</button>
                        <button class="filter-chip" onclick="setFilter(this,'night')">🌙 Ночные тарифы</button>
                        <button class="filter-chip" onclick="setFilter(this,'food')">🍕 Еда</button>
                    </div> */}
                </div>
            </section>
            



    <section className="cards">

        <h1 style={{ margin: "32px 0 24px" }}>Игровые клубы Красноярска</h1>

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

        
    </section>
    </div>
            
    );
}

export default Clubs;