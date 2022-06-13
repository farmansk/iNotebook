import React, { useContext, useState } from 'react'
import contextValue from '../context/notes/NoteContext'

const AddNote = (props) => {

    const context = useContext(contextValue);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "Enter The Title Here", description: "Enter The Description Here", tag: "Give a tag to your notes" })

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added Note Successfully", "success")
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} value={note.title} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote