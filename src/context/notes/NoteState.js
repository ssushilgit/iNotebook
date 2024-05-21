import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all Note
  const getNotes = async () => {
  // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MDVmZTg0N2IzODExMTEyYjVmYWY4In0sImlhdCI6MTcxNTQ5NDkwOH0.vxk7n8d4t_3CMCzLO1O6Zyp5Wkf2kM2jiK9vUyacEN8"
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MDVmZTg0N2IzODExMTEyYjVmYWY4In0sImlhdCI6MTcxNTQ5NDkwOH0.vxk7n8d4t_3CMCzLO1O6Zyp5Wkf2kM2jiK9vUyacEN8"
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a new note")
    const note = {
      "_id": "6641e51820bee4426a6bf3c3",
      "user": "66405fe847b3811112b5faf8",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-05-13T10:02:00.996Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  // Delete a Note
  const deleteNote = (id) => {
    // TODO API CALL
    console.log("Deleting the node  with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call  
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0MDVmZ Tg0N2IzODExMTEyYjVmYWY4In0sImlhdCI6MTcxNTQ5NDkwOH0.vxk7n8d4t_3CMCzLO1O6Zyp5Wkf2kM2jiK9vUyacEN8"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json()

    // Logic to edit in client site
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
