import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
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
        fetch(`${backendUrl}/api/user/login`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            method: 'POST'
        })
            .then(response => {
                if (response.status === 200) {
                    alert("User logged in successfully");
                }
                return response.json();
            })
            .then(data => {
                if (data.access_token) {
                    sessionStorage.setItem('token', data.access_token);
                    navigate('/');
                }
            })
            .catch(err => console.error(err));


    }

    return (
        <div className="text-center" style={{ maxWidth: "330px", margin: "auto", padding: "15px" }}>
            <form className="form-signin" onSubmit={handleUserSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={handleChange} name='email' type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={handleChange} name='password' type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                <div className='d-flex align-items-center justify-content-center'>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                    <p>or</p>
                    <button className="btn btn-lg btn-danger btn-block m-2" onClick={() => navigate('/register')}>Sign in</button>
                </div>
            </form>
        </div >

    )
}
export default Login;