import React, { useState, useContext } from 'react'
import userContext from '../context/users/userContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Login = (props) => {
    const context = useContext(userContext)
    const {userLogin} = context;
    let history = useHistory();
    const [creds, setCreds] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await userLogin(creds, props.showAlert);
        if(success){
            history.push('/')
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
