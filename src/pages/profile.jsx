import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useFav } from "../context/FavContext.jsx";
import ClubCard   from "../assets/components/club/ClubCard.jsx";

const Profile = () => {
    const { user, isAuth, loading, logout } = useAuth();
    const {favorites, removeFav} = useFav();

     if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p>Загрузка...</p>
      </div>
    );
  }

  // Если не авторизован — редирект на страницу входа
  if (!isAuth) {
    return <Navigate to="/Login" replace />;
  }

  // ── Форматирование даты регистрации хз зачем ───────────────────────
  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('ru-RU', {
        day:   '2-digit',
        month: 'long',
        year:  'numeric',
      })
    : '—';


    return ( 
        <div  className="container">
          <div className="profile">
            <div className="main-info">
              <h2 className="mb-1">Профиль</h2>
              <h1 className="mb-2" >Добро пожаловать, {user.name}!</h1>
              <hr className="mb-2"/>
              </div>
              <div className="fav">
                <p className="mb-2">В избранном ({favorites.length})</p>
                <div className="clubs-grid">
                  {favorites.length === 0 ? (
                    <p> Вы еще не добавили ничего в избранное :(</p>) : 
                    (favorites.map(club => (
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
                  )))}
                </div>
              </div>
          </div>
         
        </div>
        

     );
}
 
export default Profile;