import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
function Signup(props) {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleclick = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password })
    })
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      props.showalert("Welcome to the website","success")
    }
    else {
      props.showalert("Invalid details","danger")
    }
  }
  const onche = (event) => {
    setEmail(event.target.value)
  }
  const onchp = (event) => {
    setPassword(event.target.value)
  }
  const oncht = (event) => {
    setName(event.target.value)
  }
  return (
    <>
      <div className="container my-3" style={{ width: "25%" }}>
        <form onSubmit={handleclick}>
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1 my-2">Name:</label>
            <input type="text" className="form-control" name="text" id="text" aria-describedby="emailHelp" placeholder="Enter your name" onChange={oncht} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputEmail1 my-2">Email address:</label>
            <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onche} />
          </div>
          <div className="form-group my-2">
            <label htmlFor="exampleInputPassword1 my-2">Password:</label>
            <input type="password" name="password" onChange={onchp} className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup