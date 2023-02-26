import React from 'react'
import "./InputOption.css"

function InputOption({Icon , title, color, toggleModalFunc}) {
  return (
    <div className="inputOption" onClick={toggleModalFunc}>
      <Icon style={{color: color}}/>
      <h4>{title}</h4>
    </div>
  )
}

export default InputOption