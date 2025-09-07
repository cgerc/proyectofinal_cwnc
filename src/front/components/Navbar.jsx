import { Link, useNavigate } from "react-router-dom";
import { Home } from "../pages/Home";
import Recipe from "../pages/Recipe";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
        alert("Logged out successfully");
    };

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
                <Link to="/">
                    <button className="btn btn-danger mx-2" type="button" onClick={handleLogout}>Logout</button>
                </Link>
            </li>
        </ul>
    );
};
