import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
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
        fetch(`${backendUrl}/api/user`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            method: 'POST'
        })
            .then(response => {
                if (response.status === 200) {
                    alert("User created successfully");
                    navigate('/');
                }
                return response.json();
            })
            .then(data => alert(data.message))
            .catch(err => console.error(err));
    }

    return (
        <div className="text-center" style={{ maxWidth: "330px", margin: "auto", padding: "15px" }}>
            <form className="form-signin" onSubmit={handleUserSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Registrarse</h1>
                <label htmlFor="inputEmail" className="sr-only">Correo electrónico</label>
                <input onChange={handleChange} name='email' type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
                <input onChange={handleChange} name='password' type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required="" />
                <label htmlFor="inputName" className="sr-only">Nombre completo</label>
                <input onChange={handleChange} name='name' type="text" id="inputName" className="form-control mb-3" placeholder="Nombre completo" required="" />
                <div className='d-flex align-items-center justify-content-center'>
                    <a className="btn btn-lg btn-primary btn-block m-2" type="submit">Sign in</a>
                   
                </div>
            </form>
        </div >

    )
}
export default Register;