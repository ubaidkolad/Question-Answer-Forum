import React, { useCallback, useState } from 'react'

const AddCategory = (props) => {

  const set = props.set
  const handleText=props.handleText
  
  


  return (
    <div>
      <input onChange={ handleText }placeholder="Add Category" type="text" />
      <button onClick={set} className="btn btn-success">Add</button>
    </div>
  )
}

export default AddCategory