import React from 'react'
import { useContext } from 'react'
import noteContex from './contex/notes/notecontex'
export default function Alert() {
    const context=useContext(noteContex)
    const {alert}=context
    return (
        <div style={{height:"50px"}}>
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            <strong>{alert.type}</strong> {alert.message}</div>
        </div>  
    )
}