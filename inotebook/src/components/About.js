import React, { useContext } from 'react'
import notecontext from '../context/Notes/noteContext'

const About = () => {
    const context=useContext(notecontext)
  return (
    <>
    <div>this is about</div>
    </>
  )
}

export default About