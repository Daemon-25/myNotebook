import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const SignUp = (props) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = creds;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth Token and redirect
            localStorage.setItem('token', json.authToken);
            history.push('/')
            props.showAlert("Account Created Successfully!", "success");
        } else {
            props.showAlert("USer already exists!", "danger");
        }
    }

    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Userme</label>
                    <input type="text" className="form-control" onChange={handleOnChange} id="name" name="name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={handleOnChange} id="email" name="email" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleOnChange} id="password" name="password" minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={handleOnChange} id="cpassword" name="cpassword" minLength={6} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
