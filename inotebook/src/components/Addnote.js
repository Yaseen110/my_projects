import React, { useState } from 'react'
import notecontext from '../context/Notes/noteContext'
import { useContext } from 'react'
function Addnote(props) {
    const context=useContext(notecontext)
    const {addnote}=context
    const[note,setNote]=useState({title:"",description:"",tag:"general"})
    const handleclick=(event)=>{
        event.preventDefault()
        addnote(note)
        setNote({title:"",description:"",tag:"general"})
        props.showalert("Note created successfully","success")
    }
    const onch=(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
  return (
    <div className="container my-3">
      <form>
        <h2>Enter your note</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onch}/>
          <div id="Help" className="form-text">Enter the title of your note.<i><b>This is a required field</b></i></div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onch}/>
          <div id="Help" className="form-text">Enter the description of your note.<i><b>This is a required field</b></i></div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag:</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onch}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>Add note</button>
      </form>
    </div>
  )
}

export default Addnote