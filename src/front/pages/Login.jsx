import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx'

const Login = () => {
    const { store, dispatch } = useGlobalReducer()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    console.log(backendUrl)
    const [user, setUser] = useState({
        email: "", password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleUserSubmit = (e) => {
        e.preventDefault();
        fetch(`${backendUrl}api/user/login`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            method: 'POST'
        })
            .then(response => {
                console.log("aqui esta la respuesta")
                if (response.status === 200) {
                    navigate("/pantry")
                    return response.json();
                } else {
                    throw new Error("Error en el inicio de sesión");
                }
            })
            .then(data => {
                console.log(data)
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    console.log(data)
                    dispatch({ type: "setUser", payload: data.user })
                    dispatch({ type: "set_login", payload: data.access_token })

                    navigate('/pantry');
                } else {
                    alert(data.message || "Error: No se recibió el token");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Error durante el inicio de sesión: " + error.message);
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg border-0" style={{ maxWidth: "400px", width: "100%" }}>
                <div className="card-body p-5">
                    <form onSubmit={handleUserSubmit}>
                        <div className="text-center mb-4">
                            <h1 className="h3 fw-bold text-success">Iniciar Sesión</h1>
                            <p className="text-muted">Accede a tu cuenta de CookIA</p>
                        </div>

                        {/* Campo Email con separación */}
                        <div className="mb-4">
                            <label htmlFor="inputEmail" className="form-label fw-semibold">
                                Correo electrónico
                            </label>
                            <input
                                onChange={handleChange}
                                name='email'
                                type="email"
                                id="inputEmail"
                                className="form-control form-control-lg"
                                placeholder="nombre@ejemplo.com"
                                required
                                autoFocus
                            />
                        </div>

                        {/* Campo Password con separación */}
                        <div className="mb-4">
                            <label htmlFor="inputPassword" className="form-label fw-semibold">
                                Contraseña
                            </label>
                            <input
                                onChange={handleChange}
                                name='password'
                                type="password"
                                id="inputPassword"
                                className="form-control form-control-lg"
                                placeholder="Ingresa tu contraseña"
                                required
                            />
                        </div>

                        {/* Botón con separación */}
                        <div className="d-grid mb-4">
                            <button
                                className="btn btn-success btn-lg"
                                type="submit"
                            >
                                Iniciar Sesión
                            </button>
                        </div>

                        {/* Enlace registro con separación */}
                        <div className="text-center">
                            <p className="mb-0">
                                ¿Eres un usuario nuevo?{' '}
                                <span
                                    className="text-success fw-semibold"
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }}
                                    onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                                    onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                                    onClick={() => navigate('/register')}
                                >
                                    Crear cuenta
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;