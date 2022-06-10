import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Fetch all Notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGJkZDM5NDUwNTBhYWMyMmVjMzQzIn0sImlhdCI6MTY1NDc2NjQ2M30.ZC42Y3IyATyNfaAmjDGvYlMlfXhpM06mfTZgZU9p6yM'
      }
    });
    const json = await response.json();
    setNotes(json);

  }

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGJkZDM5NDUwNTBhYWMyMmVjMzQzIn0sImlhdCI6MTY1NDc2NjQ2M30.ZC42Y3IyATyNfaAmjDGvYlMlfXhpM06mfTZgZU9p6yM'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGJkZDM5NDUwNTBhYWMyMmVjMzQzIn0sImlhdCI6MTY1NDc2NjQ2M30.ZC42Y3IyATyNfaAmjDGvYlMlfXhpM06mfTZgZU9p6yM'
      }
    });
    const json = await response.json();

    // Logic to delete in frontend
    let newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJhMGJkZDM5NDUwNTBhYWMyMmVjMzQzIn0sImlhdCI6MTY1NDc2NjQ2M30.ZC42Y3IyATyNfaAmjDGvYlMlfXhpM06mfTZgZU9p6yM'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    // Logic to edit in frontend
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState