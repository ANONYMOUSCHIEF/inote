import React, { useState } from 'react'

function Details() {
    const[details,setDetails]=useState({id:"",email:"",name:""})
    const fetchDetails= async() =>{
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json=await response.json(); 
        setDetails({id:json._id,email:json.email,name:json.name})
      }
//       const handleClick=()=>{
//         fetchDetails()
//    }
   setTimeout(() => {
    fetchDetails()
   }, []);
   const {id,email,name}=details
  return (
    <div className="container">
        <div className="card">
        <div className="card-body">
          <h5 className="card-title">Email : {email}</h5>
          <h6 className="card-text">UserName : {name}</h6>
          <p className="card-text">Id : {id}</p>
          
        </div>
      </div>
    </div>
  )
}

export default Details
