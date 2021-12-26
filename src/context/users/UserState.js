import React, { useState} from "react";
import userContext from "./userContext";


const UserState = (props) => {

    const host = "http://localhost:5000"
    const [user, setuser] = useState({name : "", email : "", date: ""})
    
    
    //Get User details
    const getDetails = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        //Set the user
        setuser(
            {
                name : json.name,
                email : json.email,
                date : json.date
            }
        )
    }

    //Login User
    const userLogin = async (creds, showAlert) =>{
        //API Call
        const response = await fetch(`${host}/api/auth/login`, {
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
            showAlert("Login Successful", "success");
        } else {
            showAlert("Invalid Credentials", "danger");
        }

        return json.success;
    }

    //User Signup
    const userSignup = async (creds, showAlert) => {
        //API Call
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //Save the auth Token
            localStorage.setItem('token', json.authToken);
            showAlert("Account Created Successfully!", "success");
            userLogin(creds, showAlert);
        } else {
            showAlert("User already exists!", "danger");
        }
    }


    return (
        <userContext.Provider value={{user, getDetails, userLogin, userSignup}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;