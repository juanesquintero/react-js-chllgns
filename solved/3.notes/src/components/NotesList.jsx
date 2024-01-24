import React from 'react'

export const NotesList = (props) => {
    const { notes = [], onSelect, selected = {} } = props
    return <div className="list-group">
        {notes.map(note => (
            <div
                data-testid="note-item"
                className={`list-group-item ${selected?.id === note?.id ? 'active' : ''}`}
                onClick={() => { onSelect(note) }}
            >
                {note?.title}
            </div>
        ))}

    </div>
}
