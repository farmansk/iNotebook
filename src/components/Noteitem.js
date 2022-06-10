import React, { useContext } from 'react'
import contextValue from '../context/notes/NoteContext'

const Noteitem = (props) => {

    const context = useContext(contextValue);
    const { note, updateNote } = props;
    const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className='card-title'>{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>

        </div>
    )
}

export default Noteitem