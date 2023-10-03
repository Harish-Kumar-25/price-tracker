'use client'
import React from 'react'
import Typerwriter from 'typewriter-effect'

function Typewriter() {
  return (
    <Typerwriter 
        options={{
            loop: true,

        }}
        onInit={(typewriter) => {
            typewriter.typeString('Smart Shopping Starts Here 😉').pauseFor(1000).start()
        }}
    />

  )
}

export default Typewriter