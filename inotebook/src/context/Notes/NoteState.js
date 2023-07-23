import React, { useState } from "react";
import notecontext from "./noteContext";

const NoteState=(props)=>{
    const host="http://localhost:5000"
    const notesinitial=[]
    const[notes,setnotes]=useState(notesinitial)
    let authtoken=localStorage.getItem('token')
    const getnotes=async ()=>{
      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'auth-token':authtoken
        },
      })
      const json =await response.json()
      console.log(authtoken)
      setnotes(json)
    }
    const addnote=async ({title,description,tag})=>{
      const response=await fetch(`${host}/api/notes/createnote`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'auth-token':authtoken
        },
        body:JSON.stringify({title,description,tag})
      })
      const json=await response.json()
      console.log(json)
      getnotes()
    }
    const deletenote=async (id)=>{
      const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'auth-token':authtoken
        },
        body:JSON.stringify()
      })
      const json=await response.json()
      getnotes()
    }
    const updatenote=async ({_id,title,description,tag})=>{
      const response=await fetch(`${host}/api/notes/updatenote/${_id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'auth-token':authtoken
        },
        body:JSON.stringify({title,description,tag})
      })
      const json=await response.json()
      getnotes()
    }
    return (
        <notecontext.Provider value={{notes,setnotes,addnote,deletenote,updatenote,getnotes}}>
            {props.children}
        </notecontext.Provider>
    )
}
export default NoteState