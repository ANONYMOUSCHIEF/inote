import React ,{ useContext, useEffect }from 'react'
import Addnote from './Addnote';
import noteContex from './contex/notes/notecontex'; // importing noteContex to use the the state directly to the Note.js file
import Noteitem from './Noteitem';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
function Note() {
    const context = useContext(noteContex); // importing the values that are define int he noteContex or we can use the State that we define in noteState.js file
    const {note,getNotes,updateNote,showAlert} = context // destructing the context value
    const [notes, setNotes] = useState({etitle: ""  , edescription: "" , etags: "" })
    const[id,setId]=useState(null)
    const ref = useRef(null)
    const refClose = useRef(null)
    let navigate=useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('token')) {getNotes()}
      else{navigate('/login')}},
    // eslint-disable-next-line
    [])
    const handleopen = (id,currentNote) => {
        ref.current.click()
        const {title,description,tags}=currentNote
        setId(id)
        setNotes({etitle:title,edescription:description,etags:tags})
        
      }
    const handleOnSubmit = (e) => {
        showAlert("success","Your note is updated")
        updateNote(id, notes.etitle, notes.edescription, notes.etags)
        refClose.current.click()
        e.preventDefault()
      }
      const onChange = (e) => {
        // we are targeting the changing value and seting it to changed in which name the vallue is changing
        setNotes({ ...note,[e.target.name]: e.target.value })
        // console.log(note.description)
      }
    return (
        <>
        <Addnote/>
        <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit your Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="form-group">
                    <label htmlFor="etitle">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={notes.etitle} aria-describedby="emailHelp" placeholder="" onChange={onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edescription">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={notes.edescription}placeholder="" onChange={onChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="etags">Tags</label>
                    <input type="text" className="form-control" id="etags" name="etags" placeholder="" value={notes.etags} onChange={onChange} />
                  </div>
                  <div className="modal-footer my-3">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit"  className="btn btn-primary" onClick={handleOnSubmit}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
            <h1>Your notes</h1>
            <div className="row">
            {note.length?note.map((notes) =>
            <div className="col-md-4 my-3" key={notes._id}>
                <Noteitem  notes={notes} handleopen={handleopen}/>
                </div>):
                <div className="container">Add Your First Note Right Now</div>
                }
            </div>
        </div>
        </>
    )
}

export default Note
