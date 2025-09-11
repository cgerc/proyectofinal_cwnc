import { Link, useNavigate } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        dispatch({ type: "logout", payload: {} })
        navigate('/login');
    }


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
                    Generar Recetas
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/favorites" className="nav-link text-success">
                    Favoritos
                </Link>
            </li>

            <li>

                {
                    store.token == null ?
                        <>
                            < Link to="/login">
                                <button className="btn btn-primary " type="button" style={{ backgroundColor: '#03C329', color: 'white' }}>Login</button>
                            </Link>
                        </> :

                        <button className="btn btn-primary " type="button" style={{ backgroundColor: 'red', color: 'white' }}
                            onClick={() => logout()}>Logout</button>



                }


            </li>
        </ul >
    );
};
