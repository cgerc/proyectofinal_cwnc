import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light nav">
			<div className="container">

				<div className="ml-auto nav">
					<img src=""></img>
					<p><a class="link-opacity-75-hover home" href="#">Home</a></p>
					<p><a class="link-opacity-75-hover mi_despensa" href="#">Mi despensa</a></p>
					<p><a class="link-opacity-75-hover mis_recetas" href="#">Mis recetas</a></p>
					<button type="button" class="btn btn-primary login">Login</button>
					


				</div>
			</div>
		</nav>
	);
};