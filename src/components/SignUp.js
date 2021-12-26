import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import userContext from '../context/users/userContext';

export const SignUp = (props) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });
    const context = useContext(userContext);
    const { userSignup } = context;
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const success = userSignup(creds, props.showAlert);

        if (success) {
            //Redirect
            history.push('/');
        }
    }

    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    }

    return (
        <div className='container mt-3'>
            <h2>Create an Account to use myNotebook</h2>
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
