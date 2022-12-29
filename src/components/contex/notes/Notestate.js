import React, { useState } from 'react'
// import {useLocation} from "react-router-dom";
import noteContex from './notecontex' // we have imported notecontex so we can use useContex and can pass the value where we want we don't have to drill the props
// import {useNavigate} from 'react-router-dom'
const NoteState = (props) => {
  // let location=useLocation();
  // we are using useState to set initial state and we can change the data using setState
  // let navigate=useNavigate()
  const [note, setNote] = useState([])
  const [alert,setAlert]=useState({type:"",message:""});
  // fetch all notes
  const getNotes= async()=>{
    const response = await fetch('http://localhost:5000/api/note/fetchallnotes', {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
    const json= await response.json(); 
    setNote(json)
  }
  // showing Alert
  const showAlert=(type,message)=>{
    console.log("showing alert")
    setAlert({
      type:type,
      message:message
    })
   setTimeout(() => {
    setAlert({type:"",message:""})
   }, 1000);
  }
  
  // Add the note
  const Addnote = async (title,description,tags) => {
    const response = await fetch('http://localhost:5000/api/note/createnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tags})
    });
    const json= await response.json(); 
    setNote(note.concat(json))
    setTimeout(() => {
      getNotes()
     }, 1000);
  }
  
  // update the note
  const updateNote = async (id,title,description,tags) => {
    const response = await fetch(`http://localhost:5000/api/note/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tags})
    });
    const json= await response.json(); 
    const newNotes= note.concat(json)
    setNote(newNotes)
    setTimeout(() => {
      getNotes()
     }, 1000);

  }
  // delete the note
  const deleteNote = async (id) => {
   showAlert("success","your note has been deleted")
    const response = await fetch(`http://localhost:5000/api/note/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json= await response.json(); 
    console.log(json)
    const newNotes=note.filter((note)=>{return note._id!==id})
    setNote(newNotes);
  }
 

  return (
    // notecontex syntax
    <noteContex.Provider value={{ note,getNotes,Addnote,updateNote,deleteNote,showAlert,alert}}>
      {/* passing noteContex to all the children of noteContex */}
      {props.children}
    </noteContex.Provider>
  )
}
export default NoteState;