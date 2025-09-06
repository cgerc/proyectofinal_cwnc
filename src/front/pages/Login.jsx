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
                </form>
            </div>
    