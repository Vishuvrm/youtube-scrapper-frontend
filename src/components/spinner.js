import React, { Component } from 'react'
import loading from "../static/spinners/Spinner-5.gif" 

const Spinner = () => {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading"></img>
      </div>
    )
  }

export default Spinner;
