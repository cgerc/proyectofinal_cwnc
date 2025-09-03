import { Link } from "react-router-dom";
import { Home } from "../pages/Home";
export const Navbar = () => {
    return (
        <ul className="nav justify-content-end nav">
            <li className="nav-item ">
                <Link to="/home">
                <a className="nav-link active text-success " aria-current="page" href="#">Home</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/pantry">
                <a className="nav-link text-success " href="#">Mi despensa</a>
                </Link>
            </li>
            <li className="nav-item">
               <a className="nav-link text-success" href="#">Mis recetas</a>
            </li>

            <li>
                <Link to="/login">
                <button className="btn btn-primary " type="button" style={{ backgroundColor: '#03C329', color: 'white' }}>Login</button>
                </Link>
            </li>
        </ul>
    );
};
