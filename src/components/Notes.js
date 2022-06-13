import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import contextValue from '../context/notes/NoteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem'

const Notes = (props) => {

    let navigate = useNavigate();

    const {showAlert} = props;
    const context = useContext(contextValue);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "Enter The Title Here", edescription: "Enter The Description Here", etag: "General" })

    // Edit Note
    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleSave = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        showAlert("Edited Note Successfully", "success");
    }

    return (
        <>
            <AddNote showAlert={showAlert} />

            <button type="button" id="editbtn" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdropedit">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdropedit" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">

                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='etitle' value={note.etitle} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="description" name='edescription' onChange={onChange} value={note.edescription} rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                                <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes