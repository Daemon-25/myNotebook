import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext'


export const User = (props) => {
    const context = useContext(userContext);
    const { user, getDetails } = context;

    useEffect(() => {
        getDetails();
        //eslint-disable-next-line
    }, [])
    
    
    return (
        <>
            <button onClick={getDetails}>Hello</button>
            <div className='container'>
                <h2>Your Personal Details</h2>
            </div>
            <div className='container my-1'>
                <ul className="list-group list-group-horizontal-xxl my-3">
                    <li className="list-group-item flex-fill">Name</li>
                    <li className="list-group-item flex-fill">{user.name}</li>
                </ul>
                <ul className="list-group list-group-horizontal-xxl my-3">
                    <li className="list-group-item flex-fill">Email</li>
                    <li className="list-group-item flex-fill">{user.email}</li>
                </ul>
                <ul className="list-group list-group-horizontal-xxl my-3">
                    <li className="list-group-item flex-fill">Date</li>
                    <li className="list-group-item flex-fill">{user.date}</li>
                </ul>
            </div>
        </>
    )
}

export default User;