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
            "_id": "619e9bcd8dd852119b222759",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:45.133Z",
            "__v": 0
        },
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
            "_id": "619e9bcc8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
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
            "_id": "619e9bcc8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
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
            "_id": "619e9bcc8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
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
            "_id": "619e9bcc8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
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
            "_id": "619e9bcc8dd852119b222757",
            "user": "619e15c996c46f0f80d14237",
            "title": "My new Note",
            "description": "This is a new note",
            "tag": "Example",
            "date": "2021-11-24T20:08:44.374Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;