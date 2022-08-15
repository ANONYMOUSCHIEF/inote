import React, { useContext } from 'react'
// import { useRef } from 'react';
import noteContex from './contex/notes/notecontex'; // importing noteContex to use the the state directly to the Note.js file
function Noteitem(props) {
  const { notes,handleopen } = props; // destructing notes props that is passed through the note.js file to the Noteitems file
  const context = useContext(noteContex); // importing the values that are define int he noteContex or we can use the State that we define in noteState.js file
  // const {title,description,tags}=note
  const { deleteNote} = context // destructing the context value
  
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{notes.title} <i className="fa-solid fa-trash" onClick={() => {deleteNote(notes._id)}} />  <i className="fa-solid fa-pen-to-square" onClick={() => {handleopen(notes._id,notes)}} /></h5>
          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
