import NoteContext from "./noteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
    const [state, setstate] = useState({
        "name" : "Lakshay",
        "class" : "5b"
    })
    
    const update = () => {
        setTimeout(()=>{
            setstate({
                "name" : "Harry",
                "class" : "10b"
            })
        }, 1000)
    }

    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;