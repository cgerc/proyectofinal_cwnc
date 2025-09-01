import { Link } from "react-router-dom";
export const Navbar = () => {
    return (
        <ul className="nav justify-content-end nav">
            <li className="nav-item ">
                <a className="nav-link active text-success " aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-success " href="#">Mi despensa</a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-success" href="#">Mis recetas</a>
            </li>
            <li>
                <button className="btn btn-primary " type="button" style={{ backgroundColor: '#03C329', color: 'white' }}>Login</button>
            </li>
        </ul>
    );
};
