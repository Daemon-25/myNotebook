import React from 'react'

export const NoteItem = (props) => {
    const { note } = props;
    return (
        <>
            <div className="col-md-3 my-3">
                <div className="card">
                    <div className="card-header">
                        {note.tag}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="far fa-trash-alt"></i>
                        <i className="far fa-edit mx-3"></i>
                    </div>
                    <div className="card-footer text-muted">
                        {note.date}
                    </div>
                </div>
            </div>
        </>
    )
}
