import { Link } from "react-router-dom";
import { Home } from "../pages/Home";
import Recipe from "../pages/Recipe";

export const Navbar = () => {
    return (
        <ul className="nav justify-content-end nav">
            <li className="nav-item">
                <Link to="/home" className="nav-link text-success">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/pantry" className="nav-link text-success">
                    Mi despensa
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/recipe" className="nav-link text-success">
                    Mis recetas
                </Link>
            </li>

            <li>
                <Link to="/login">
                    <button className="btn btn-primary " type="button" style={{ backgroundColor: '#03C329', color: 'white' }}>Login</button>
                </Link>
            </li>
        </ul>
    );
};
