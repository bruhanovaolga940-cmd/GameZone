import "./search.css"

const Search = () => {
    return ( 
        <section class="search-section">
        <div class="container">
            <div class="search-bar">
                <div class="search-input-wrap">
                    <span class="search-input-icon">🔍</span>
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
     );
}
 
export default Search;