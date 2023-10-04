import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Conductors = () => {
  return (
    <div>
      <h2 style={{
        marginTop:"30px",
        fontSize:"large",
        color:"#5A5A5A"
      }}>Conductor Details</h2>
      <Link to='/edtConductor'>
      <Button variant="outline-success" style={{marginRight:"50px", float:"right"}}>Add new Conductor</Button></Link>
    </div>
  )
}

export default Conductors
