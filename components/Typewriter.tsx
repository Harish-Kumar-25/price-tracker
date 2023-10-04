'use client'
import React from 'react'
import Typerwriter from 'typewriter-effect'

interface Props{
  content : string
}

function Typewriter( {content} : Props) {
  return (
    <Typerwriter 
        options={{
            loop: true,

        }}
        onInit={(typewriter) => {
            typewriter.typeString(content).pauseFor(1000).start()
        }}
    />

  )
}

export default Typewriter