import { NavLink } from "react-router-dom";


const CLub = ({name, img, id}) => {
    return ( 
        <NavLink to={`/Club/${id}`}>
            <li className="project">

                    <img src={img} alt={name} className="project__img" />
                    <h3 className="project__title">{name}</h3>

            </li>
        </NavLink>
     );
}
 
export default CLub;