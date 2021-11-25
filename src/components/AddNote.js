import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const handleOnChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className='container my-3'>
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="tit;e" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange}/>
                    </div>
                    
                    <button type="submit" className="btn btn-dark" onClick={handleAddNote}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
