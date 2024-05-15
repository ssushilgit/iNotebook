import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.update()
    // eslint-disable-next-line
  },[])

  return (
    <div>
      This is about {a.state.name} and he is in {a.state.standard} standard
    </div>
  )
}

export default About
