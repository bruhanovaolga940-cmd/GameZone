
import { useParams } from "react-router-dom";
import { clubs} from "../assets/helpers/ClubList";

const Club = () => {
    const {id} = useParams(Club, id);
    const club = clubs[id];

    return ( 
        <section>
            <div className="container">
                <div className="clubs-details">
                    <h2 className="title">{club.name}</h2>
                </div>
            </div>
        </section>
        
     );
}
 
export default Club;