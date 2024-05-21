import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
  
    const notesInitial =[
        {
          "_id": "6641e51820bee4426a6bf3c3",
          "user": "66405fe847b3811112b5faf8",
          "title": "Mark Henry",
          "description": "World's Strongest Men, WWE Superstar",
          "tag": "wrestling",
          "date": "2024-05-13T10:02:00.996Z",
          "__v": 0
        },
        {
          "_id": "6642f97a0ef37b2207e03ead",
          "user": "66405fe847b3811112b5faf8",
          "title": "Sushant KC",
          "description": "Nepali Singer",
          "tag": "music",
          "date": "2024-05-14T05:41:14.584Z",
          "__v": 0
        },
        {
          "_id": "6642f9b80ef37b2207e03eb0",
          "user": "66405fe847b3811112b5faf8",
          "title": "Iphone 15 Pro Max",
          "description": "Newly launched mobile phone used all around the world",
          "tag": "mobile",
          "date": "2024-05-14T05:42:16.101Z",
          "__v": 0
        }
              
      ]

      const [notes, setNotes] = useState(notesInitial)

      // Add a Note
      const addNote = (title, description, tag) =>{
        // TODO API CALL
        console.log("Adding a new note")
        const note  = {
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
      const deleteNote = (id) =>{
        console.log("Deleting the node  with id "+id)
        const newNotes = notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
        
      }
      // Edit a Note
      const editNote = () =>{
         
      }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
