import React, { useContext, useEffect } from 'react'
import userContext from '../context/users/userContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export const User = (props) => {
    const context = useContext(userContext);
    const { user, getDetails, deleteUser } = context;
    let history = useHistory();

    useEffect(() => {
        getDetails();
        //eslint-disable-next-line
    }, [])

    const handleDelete = () => {
        const success = deleteUser();

        if(success){
            props.showAlert("Your Account has been Deleted", "success");
            history.push('/login')
        }else  
            props.showAlert("Your Account has not been deleted", "danger")
    }
    
    
    return (
        <>
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
            <button type="button" className="btn btn-danger mx-1 my-3" onClick={handleDelete}>Delete Account</button>
        </>
    )
}

export default User;