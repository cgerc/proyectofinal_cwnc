import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login= () => {
    const backendUrl= import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    const [user, setUser]= useState({
        email: "", password: ""
    });
    const navigate= useNavigate();

    const handleChange= (e) =>{
        const {value,name}= e.target;
        setUser({...user,[name]:value});
    }

    const handleUserSubmit= (e) => {
        e.preventDefault();
        fetch( `${backendUrl}/api/user/login`,{
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
            method: 'POST'
        } )
            .then(response => {
                if(response.status === 200) {
                    alert("User logged in successfully");
                }
                return response.json();
            })
            .then(data => {
                if (data.access_token){
                    localStorage.setItem('token', data.access_token);
                    navigate('/');
                }
            })
            .catch(error => console.log(error))
        }

        return (
            <div className="text-center" style={{maxWidth: "330px", margin: "auto", padding:"15px"}}>
                <form className="form-sigin" onSubmit={handleUserSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
                    <label htmlFor="inputEmail" className="sr-only">Correo electrónico</label>
                    <input onChange={handleChange} name='email' type="email" id="inputEmail" className="form-control" placeholder="Email adress" required="" autoFocus="" />
                    <label htmlFor="inputPassword" className="sr-only">cONTRASEÑA</label>
                    <input onChange={handleChange} name='password' type="password" id="inputPassword" className="form-control"placeholder="Contraseña" required="" />
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                        <a className="btn btn-lg btn-primary btn-block" type="subtmit">Iniciar sesión</a>
                        <p className="mt-3">
                            ¿Eres un usuario nuevo?{ ' '}
                            <span
                                style={{
                                    color: '#007bff',
                                    cursor: 'pointer',
                                    textDecoration: 'none'
                                }}
                                onMouseOver={(e) => e.target.style.textDecoration= 'underline'}
                                onMouseOut={(e) =>e.target.style.textDecoration= 'none'}
                                onClick={() => navigate('/register')}
                                >
                                    Crear cuenta
                                </span>
                        </p>
                    </div>
                </form>
            </div>
    