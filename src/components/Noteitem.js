import React, { useContext, useRef } from 'react'
import contextValue from '../context/notes/NoteContext'

const Noteitem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(contextValue);
    const { deleteNote } = context;

    // Delete Note
    const deleteref = useRef(null);
    const handleDelete = () => {
        deleteref.current.click();
    }

    const handleConfirmDelete = () => { deleteNote(note._id) }

    return (
        <>
            <button type="button" id="deletebtn" ref={deleteref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdropdelete">
                Launch static backdrop modal
            </button>
            <div className="modal fade" id="staticBackdropdelete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Delete Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h7>Are You sure to delete the Note?</h7>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleConfirmDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <h6 className='card-title'>{note.tag}</h6>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem