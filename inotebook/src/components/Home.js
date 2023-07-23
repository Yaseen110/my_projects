import React, { useContext } from 'react'
import Notecontainer from './Notecontainer'

const Home = (props) => {
  return (
    <>
    <Notecontainer showalert={props.showalert}/>
    </>
  )
}

export default Home