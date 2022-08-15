import React, { useContext, useState } from 'react'
import noteContex from './contex/notes/notecontex'; // importing noteContex to use the the state directly to the Note.js file
function Addnote() {
    const context = useContext(noteContex); // importing the values that are define int he noteContex or we can use the State that we define in noteState.js file
    const { Addnote,showAlert } = context // destructing the context value
    const[note, setNote] = useState({ title: ""  ,description: " " ,tags: "" })
    const handleOnsubmit = (e) => {
        e.preventDefault() 
        showAlert("success","Your note has been added")
        Addnote(note.title, note.description, note.tags) 
        setNote({ title: ""  ,description: " " ,tags: "" })  
    }
    const onChange=(e)=>{
        // we are targeting the changing value and seting it to changed in which name the vallue is changing
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <form onSubmit={handleOnsubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" placeholder="" onChange={onChange} minLength={3} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="" onChange={onChange} minLength={5} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tags</label>
                    <input type="text" className="form-control" id="tags" name="tags" placeholder="" value={note.tags} onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length <3 || note.description.length <5} className="btn btn-primary" >Add note</button>
            </form>
        </div>
    )
}

export default Addnote
