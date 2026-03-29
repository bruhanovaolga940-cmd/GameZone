import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, isAuth, loading, logout } = useAuth();

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
        <h1>Профиль</h1>
        <p>Вы {user.name}</p> 
        </div>
        

     );
}
 
export default Profile;