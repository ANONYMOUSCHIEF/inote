import React from 'react'
import {Link,useNavigate} from "react-router-dom";
import { useContext } from 'react'
import noteContex from './contex/notes/notecontex'
function Navbar() {
  const contex=useContext(noteContex)
  const {showAlert}=contex
  let location=useNavigate();
  const handleLogOut=(e)=>{
    e.preventDefault()
    localStorage.removeItem('token')
    showAlert("success","You have logout successfully")
    location('/login')
  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg bg-dark navbar-dark`}>
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNote</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={`nav-item ${location.pathname==="/"?'active':""}`}>
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className={`nav-item ${location.pathname==="/about"?'active':""}`}>
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            </div>
          {!localStorage.getItem("token")?
          <div>
          <Link to="/login" className="btn btn-primary btn-lg mx-2" role="button" aria-disabled="true">Login</Link>
          <Link to="/signup" className="btn btn-primary btn-lg" role="button" aria-disabled="true">Sign Up</Link>
          </div>:<div><Link to="/login" className="btn btn-primary btn-lg " role="button" aria-disabled="true" onClick={handleLogOut}>Logout</Link></div>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
