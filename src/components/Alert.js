import React from 'react'

export const Alert = (props) => {
    return (
        <>
            <div className="alert alert-dark" role="alert">
                {props.message}
            </div>
        </>
    )
}
