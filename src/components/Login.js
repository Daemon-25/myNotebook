import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Login = (props) => {
    const [creds, setCreds] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth Token and redirect
            localStorage.setItem('token', json.authToken);
            history.push('/')
            props.showAlert("Login Successful", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-3'>
        <h2>Login to Continue to myNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={creds.email} id="email" name='email' aria-describedby="emailHelp" onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={creds.password} id="password" name='password' onChange={handleOnChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
