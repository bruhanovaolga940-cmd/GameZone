import { useFav } from "../../../context/FavContext";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";

import styles from './favBtn.module.css';
import like from "../../img/like.svg"
import liked from "../../img/liked.svg"

export function FavBtn ({club}){
    const { isFavorite , toggleFav} = useFav()
    const favored = isFavorite(club.id);
    const {user} = useAuth()
    const [message , setMessage] = useState(false);

    const handlClick = () => {
        if (!user) {
            setMessage(true);
            setTimeout(() => setMessage(false), 2000);
            return;
        }
        toggleFav(club);
    }

    return (
        <div className={styles.fav}>
        <button onClick={handlClick} className={styles.button} >
            {favored ? <img src={liked} alt=".." className={styles.liked}/> : <img src={like} alt=".." />}
        </button>
        {message && (
            <div className={styles.errMessage}> необходимо авторизироваться </div>
        )}
        </div>
      );
}
