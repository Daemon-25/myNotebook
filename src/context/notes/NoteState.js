import NoteContext from "./noteContext";
import React, { useState } from 'react';

const NoteState = (props) => {
    const initialNotes = [
        {
            "_id": "619e9bcc8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcd8dd8752119b222759",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:45.133Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8dd8522119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8d4d852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc88dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8dd3852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8dd8752119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc86dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bc5c8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8dd8521194b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8d5d852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
        {
            "_id": "619e9bcc8dd8552119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(initialNotes)

    //Add Note
    const addNote = (title, desciption, tag)=>{
        console.log("Adding")
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

    //Edit Note
    const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes);
    }
    //Delete Note
    const editNote = ()=>{

    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;