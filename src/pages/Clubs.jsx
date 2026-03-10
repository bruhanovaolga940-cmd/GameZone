import Club from "./Club";
import { clubs} from "../assets/helpers/ClubList";

const Clubs = () => {
    return ( 
        <main className="section">
            <div className="container">
                <h2 className="title-1">Projects</h2>
                <ul className="projects">

                    {clubs.map((Club, id)=> {
                        return(
                            <Project key={id} 
                            title={Club.title}
                            index={id}/>
                        )
                    })}

                </ul>
            </div>
        </main>
     );
}
 
export default Clubs;