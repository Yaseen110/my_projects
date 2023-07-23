import React,{useContext} from 'react'
import notecontext from '../context/Notes/noteContext'
function Noteitem(props) {
    const {note}=props
    const context=useContext(notecontext)
    const {deletenote}=context
  return (
    <>
    <div className="col-md-3">
        <div className="card m-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}:    <span className='text-muted'>{note.tag}</span></h5>
                <p className="card-text">{note.description}</p>
                <div className="d-flex flex-row">
                    <div className="m-auto">
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deletenote(note._id);props.showalert("Note deleted successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.handleclick(note)}}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Noteitem