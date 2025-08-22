import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<ul className="nav justify-content-end">
			<li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">Home</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="#">Mi despensa</a>
			</li>
			<li className="nav-item">
				<a className="nav-link" href="#">Mis recetas</a>
			</li>
			<li>
				<button className="btn btn-primary btn-lg" type="button" style={{ backgroundColor: '#03C329', color: 'white' }}>Ver productos</button>
			</li>
		</ul>
	);
};