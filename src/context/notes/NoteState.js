import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "62a1dce06063f76de65d08ac",
          "user": "62a0bdd3945050aac22ec343",
          "title": "Mytitleupdated",
          "description": "Description",
          "tag": "react",
          "date": "2022-06-09T11:43:28.371Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState