import React, { useContext,useState, useEffect, useRef } from 'react'
import notecontext from '../context/Notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

function Notecontainer(props) {
    const context = useContext(notecontext)
    const { notes, getnotes,updatenote} = context
    const nav=useNavigate(null)
    useEffect(() => {
        if(localStorage.getItem('token')){
            getnotes()
        }
        else{
            nav('/login')
        }
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const[note,setNote]=useState({id:"",title:"",description:"",tag:""})
    const handleclick = (curnote) => {
        ref.current.click()
        setNote(curnote)
        console.log(curnote._id)
    }
    const onch=(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onch} />
                                    <div id="Help" className="form-text">Enter the title of your note.<i className='text-muted'><b>This is a required field</b></i></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={onch} />
                                    <div id="Help" className="form-text">Enter the description of your note.<i className='text-muted'><b>This is a required field</b></i></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag:</label>
                                    <input type="text" className="form-control" value={note.tag} id="tag" name='tag' onChange={onch} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={()=>{updatenote(note);refclose.current.click()}}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Addnote showalert={props.showalert}/>
            <div className="container">
                <h3 className="my-3">Your existing notes:</h3>
                <div className="row">
                    {notes.length===0 && "No notes to display"}
                    {notes.map((note) => {
                        return (
                            <Noteitem key={note._id} note={note} handleclick={handleclick} showalert={props.showalert}/>
                            )
                        })}
                </div>
            </div>
        </>
    )
}

export default Notecontainer