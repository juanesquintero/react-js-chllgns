import React, { useState } from 'react'

export const NoteForm = (props) => {
    const { note = { title: '', text: '', }, onSubmit, onCancel, onChange } = props

    const handleFormInput = (e) => {
        const name = e?.target?.name;
        const value = e?.target?.value;
        onChange({ ...note, [name]: value })
    }

    return <form>
        <div className="form-group">
            <label>Title:</label>
            <input
                className="form-control"
                data-testid="input-title"
                name="title"
                value={note?.title}
                onChange={handleFormInput}
            />
        </div>
        <div className="form-group">
            <label>Note:</label>
            <textarea
                className="form-control"
                data-testid="input-text"
                name="text"
                value={note?.text}
                onChange={handleFormInput}
            />
        </div>
        <div className="form-group">
            <input
                type="button"
                data-testid="cancel-note"
                className="btn btn-default pull-right"
                value="Cancel"
                onClick={onCancel}
            />
            <input
                type="submit"
                data-testid="save-note"
                className="btn btn-default pull-right"
                value="Save"
                onClick={(e) => {
                    e.preventDefault();
                    onSubmit(note)
                }}
            />
        </div>
    </form>
}
