import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import { useState } from 'react';
// hamne concurrently package install kiya aur phir package.json main jaake both waali line add kiya taaki apna dono cheezen ek saath chal jaayen
function App() {
  const[alert,setAlert]=useState(null)
  const showalert=async (message,type)=>{
    await setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
  <>
  <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <Routes>
        <Route path='/' element={<Home showalert={showalert}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login showalert={showalert}/>}/>
        <Route path='/signup' element={<Signup showalert={showalert}/>}/>
      </Routes>
    </Router>
  </NoteState>
  </>
  );
}

export default App;
