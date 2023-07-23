import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleclick=async(e)=>{
        e.preventDefault()
            const response=await fetch(`http://localhost:5000/api/auth/login`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({email,password})
            })
            const json=await response.json()
            console.log(json)
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                navigate('/')
                props.showalert("Welcome to the website","success")
            }
            else{
                props.showalert("invalid credentials please click on signup if you dont have an account","danger")
            }
    }
    const onche=(event)=>{
        setEmail(event.target.value)
    }
    const onchp=(event)=>{
        setPassword(event.target.value)
    }
    return (
        <>
        <div className="container my-3" style={{width:"25%"}}>
        <form onSubmit={handleclick}>
            <div className="form-group my-2">
                <label htmlFor="exampleInputEmail1 my-2">Email address:</label>
                <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onche}/>
            </div>
            <div className="form-group my-2">
                <label htmlFor="exampleInputPassword1 my-2">Password:</label>
                <input type="password" name="password" onChange={onchp} className="form-control" id="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
        </>
    )
}

export default Login