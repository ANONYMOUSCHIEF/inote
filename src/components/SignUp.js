import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import noteContex from './contex/notes/notecontex'
function Signup() {
  let navigate=useNavigate()
  const [data,setData]=useState({Username:"",email:"",password:""})
  const contex=useContext(noteContex)
  const {showAlert}=contex
  const signupUsingCrediential = async (name,email,password)=>{
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    });
    const json= await response.json(); 
    if(json.success){
      localStorage.setItem('token',json.authToken)
      navigate('/')
      showAlert("success","You have sign up")
  }
    else{
      showAlert("danger","Email is already taken")
    }}
  const onSubmit=(e)=>{
    signupUsingCrediential(data.Username,data.email,data.password)
    e.preventDefault()
  }
  const onChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  return (
    <div className="container">
       <h1>Create Account to Use iNote</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Username</label>
          <input type="text" className="form-control" id="Username" name='Username' aria-describedby="emailHelp" value={data.Username} onChange={onChange} placeholder="Enter email" required/>
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={data.email} onChange={onChange} placeholder="Enter email" required/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={data.password} placeholder="Password" required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
