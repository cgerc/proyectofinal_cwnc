import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

    const { store, dispatch } = useGlobalReducer()


    const logout = () => {
        localStorage.clear()
        dispatch({ type: "logout", payload: {} })

    }

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
                <Link to="/recipe">
                    <a className="nav-link text-success" href="#">Mis recetas</a>
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
