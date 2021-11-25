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
        console.log(json);
        setNotes(json);
    }

    //Add Note
    const addNote = async (title, desciption, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTE1Yzk5NmM0NmYwZjgwZDE0MjM3In0sImlhdCI6MTYzNzc1NTQzMn0.fyqBvkVbBFohWWSgPgWh1Kt9iQdH5N3Ud_jFCf45d4Y'
            },
            body: JSON.stringify({title, desciption, tag})
        });

        //Client side for adding
        const note = {
            "_id": "619e9bcc8d8552119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": title,
            "description": desciption,
            "tag": tag,
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        }
        setNotes(notes.concat(note));
    }

    //Delete Note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/619e9ba48dd852119b222751`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZTE1Yzk5NmM0NmYwZjgwZDE0MjM3In0sImlhdCI6MTYzNzc1NTQzMn0.fyqBvkVbBFohWWSgPgWh1Kt9iQdH5N3Ud_jFCf45d4Y'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json;
    //Edit in Client Side
    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
        }
    }
}
return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;


