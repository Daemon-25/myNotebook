import NoteContext from "./noteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes)

    //Get all Notes
    const getNotes = async () => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTE1Yzk5NmM0NmYwZjgwZDE0MjM3In0sImlhdCI6MTYzNzc1NTQzMn0.fyqBvkVbBFohWWSgPgWh1Kt9iQdH5N3Ud_jFCf45d4Y'
            }
        });
        const json = await response.json();
        
        setNotes(json);
    }

    //Add Note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTE1Yzk5NmM0NmYwZjgwZDE0MjM3In0sImlhdCI6MTYzNzc1NTQzMn0.fyqBvkVbBFohWWSgPgWh1Kt9iQdH5N3Ud_jFCf45d4Y'
            },
            body: JSON.stringify({title, description, tag})
        });

        const note = await response.json();

        //Client side for adding
        setNotes(notes.concat(note));
    }

    //Delete Note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTE1Yzk5NmM0NmYwZjgwZDE0MjM3In0sImlhdCI6MTYzNzc1NTQzMn0.fyqBvkVbBFohWWSgPgWh1Kt9iQdH5N3Ud_jFCf45d4Y'
            },
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTE1Yzk5NmM0NmYwZjgwZDE0MjM3In0sImlhdCI6MTYzNzc1NTQzMn0.fyqBvkVbBFohWWSgPgWh1Kt9iQdH5N3Ud_jFCf45d4Y'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();

    //Edit in Client Side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
        }
    }
    setNotes(newNotes);
}
return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;


