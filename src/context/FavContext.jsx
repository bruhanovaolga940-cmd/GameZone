import { createContext, useState, useContext, useEffect } from 'react';

const FavContext = createContext();

export function FavProvider({children}) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    })

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFav = (club) => {
        setFavorites (prev => [...prev, club]);
    };

    const removeFav = (clubId) => {
        setFavorites (prev => prev.filter(c => c.id !==clubId));
    };

    const isFavorite = (clubId) => {
        return favorites.some(f => f.id === clubId)
    }

    const toggleFav = (club) => {
        if (isFavorite(club.id)) {
            removeFav(club.id);
        } else {
            addFav(club)
        };
    };

return(
    <FavContext.Provider value={{
        favorites,
        addFav,
        removeFav,
        isFavorite,
        toggleFav,
    }}  > {children} </FavContext.Provider>
)}

export function useFav(){
    return useContext(FavContext)
}
