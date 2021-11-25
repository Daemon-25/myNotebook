import React from 'react'

export const NoteItem = (props) => {
    const { note } = props;
    return (
        <>
            <div className="col-md-3 my-3">
                <div class="card text-center">
                    <div class="card-header">
                        {note.tag}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{note.title}</h5>
                        <p class="card-text">{note.description}</p>

                    </div>
                    <div class="card-footer text-muted">
                        {note.date}
                    </div>
                </div>
            </div>
        </>
    )
}
