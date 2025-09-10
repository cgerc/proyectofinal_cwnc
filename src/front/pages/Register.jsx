import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx'//


const Register = () => {
    const { store, dispatch } = useGlobalReducer()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [user, setUser] = useState({
        email: "", password: "", name: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();
        fetch(`${backendUrl}api/user`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            method: 'POST'
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {

                    alert("Usuario creado exitosamente");

                    return response.json();
                } else {
                    throw new Error("Error en el registro");
                }
            })
            .then(data => {
                console.log(data)
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    dispatch({ type: "setUser", payload: data.user })
                    dispatch({ type: "set_login", payload: data.access_token })
                    navigate('/pantry');

                } else {

                    alert(data.message || "Error: No se recibió token");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Error durante el registro: " + err.message);
            });
    };

    return (
        <div className="text-center" style={{ maxWidth: "330px", margin: "auto", padding: "15px" }}>
            <form className="form-signin" onSubmit={handleUserSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Crea tu cuenta gratuita</h1>
                <label htmlFor="inputEmail" className="sr-only">Correo electrónico</label>
                <input onChange={handleChange} name='email' type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
                <input onChange={handleChange} name='password' type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required="" />
                <label htmlFor="inputName" className="sr-only">Nombre completo</label>
                <input onChange={handleChange} name='name' type="text" id="inputName" className="form-control mb-3" placeholder="Nombre completo" required="" />
                <div className='d-flex align-items-center justify-content-center'>
                    <button
                        href="#"
                        className="btn btn-lg btn-primary btn-block m-2 " type="submit"

                    >
                        Registrarse

                    </button>


                </div>
            </form>
        </div >

    )
}
export default Register;