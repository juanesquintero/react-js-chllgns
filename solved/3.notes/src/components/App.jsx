import React, { useState, useEffect } from 'react'

import { NotesList } from './NotesList'
import { NoteForm } from './NoteForm'

export const App = (props) => {
    const { service } = props

    const [notes, setNotes] = useState([])
    const [selected, setSelected] = useState(null)


    // (!) Get notes from service
    async function getNotes() {
        const fetchedNotes = await service.getNotes();
        setNotes(fetchedNotes);
        console.log(fetchedNotes);
    }

    useEffect(() => {
        getNotes()
        setSelected(null);
    }, []);


    // Select new empty note
    function newNote() {
        setSelected({ id: null, title: '', text: '' });

    }

    // Set note as selected
    function onSelect(note) {
        console.log(note)
        setSelected(note);
    }

    // Save note to service
    async function onSubmit(note) {
        await service.saveNote(note);
        getNotes()
    }

    // Unselect note
    function onCancel() {
        setSelected(null);
    }

    const onChange = (note) => {
        setSelected(note)
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>React notes</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <NotesList notes={notes} onSelect={onSelect} selected={selected} />
                </div>
                <div className="col-md-8">
                    {selected && <NoteForm note={selected} onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} />}
                    {!selected && <div><button data-testid="new-note" onClick={newNote}>New Note</button></div>}
                </div>
            </div>
        </div>
    )
}
