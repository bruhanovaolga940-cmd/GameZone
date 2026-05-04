import { useState, useMemo } from "react";
import { clubs } from "../assets/helpers/ClubList.jsx";
import ClubCard   from "../assets/components/club/ClubCard.jsx";
import img from "../pages/poisk.png";

const Clubs=()=> {

    const ALL_TAGS = [...new Set(clubs.flatMap(club => club.tags))];

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("name");
    const [activeTags, setActiveTags] = useState([]);

// фильтрация по тегам
    const toggleTag = (tag) => {
        setActiveTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }
//  пересчитывает значение только при изменении зависимостей
    const filteredClubs = useMemo(()=>{
        let result = [...clubs];


        // Поиск
        if (search) {
            const query = search.toLowerCase();

            result = result.filter(club => 
                club.name.toLowerCase().includes(query) || club.address.toLowerCase().includes(query)
            );
        }


            // фильтр
        if (filter === "open") {
            result = result.filter(club => club.isOpen === true) 
        }

        // теги
        if (activeTags.length > 0) {
            result = result.filter(club => activeTags.every(tag => club.tags.includes(tag)))
        }
        

        // сортировка
        result.sort((a, b)=>{

            if (sort === "name") {
            return a.name.localeCompare(b.name, "en")
            }

            if (sort === "rating") {
                return b.rating - a.rating; 
            }
            return 0;
        });
        return result;

        }, [search, activeTags, filter, sort])
        ;



    return (
        <div className="container">

            <section class="search-section">
                <div class="container">
                    <div class="search-bar">

                        {/* строка поиска */}
                        <div class="search-input-wrap">
                            <span class="search-input-icon"><img src={img}></img></span>
                            <input type="text" id="mainSearch" placeholder="Найти клуб по названию или адресу..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}  />
                        </div>
                        {/* Сортировка */}
                        <select 
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}>
                            <option value="rating">По рейтингу</option>
                            <option value="name">По названию</option>
                        </select>
                    </div>
                    {/* фильтры */}
                    <div class="filter-row">
                        <span class="filter-label">Фильтры:</span>
                        {["all", "open"].map(f => (
                            <button key={f}  className={`filter-chip ${filter === f ? "active": "" }`} 
                            onClick={() => setFilter(f)}>
                            {f === "all" && "Все"}
                            {f === "open" && "Открыто"}
                            </button>
                        ))}

                        {ALL_TAGS.map(tag => (
                            <button 
                            key={tag}
                            className= {`filter-chip ${activeTags.includes(tag) ? "active" : ""}`}
                            onClick={() => toggleTag(tag)}
                            >{tag}</button>
                        ))}
                    </div>
                </div>
            </section>
            



    <section id="clubs" className="cards">

        <h1 style={{ margin: "32px 0 24px" }}>Игровые клубы Красноярска</h1>

            {/* Рендерим карточку для каждого клуба */}
            <div className="clubs-grid">

                
                {filteredClubs.length > 0 ? (
                filteredClubs.map(club => (
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
                    img={club.img}
                    />
                ))):(
                    <div className="empty-state">
                        <div className="empty-icon">:(</div>
                        <p>Ничего не найдено</p>
                        <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                                setSearch("");
                                setFilter("all");
                            }}
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>

        
    </section>
    </div>
            
    );
}

export default Clubs;