import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (event) => {
        const { value, name } = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleUserSubmit = (event) => {
        event.preventDefault();
    }


    return (
        <div>
            <form className="form-signin" onSubmit={handleUserSubmit}>
                <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input onChange={handleChange} name='email' type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus="" />
                </div>
                <div>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input onChange={handleChange} name='password' type="password" id="inputPassword" className="form-control" placeholder="Password" required="" />
                </div>
                <div>
                    <label htmlFor="inputName" className="sr-only">Name</label>
                    <input onChange={handleChange} name='name' type="text" id="inputName" className="form-control" placeholder="Name" required="" />
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
            </form>
        </div>
    );
}

export default Login;