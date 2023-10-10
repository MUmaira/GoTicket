import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import ConductorDetails from '../components/ConductorDetails'

const Conductors = () => {
  return (
    <div>
      <br/><br/>
      <h2 style={{
        marginTop:"0px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"280px"
      }}>Conductor Details</h2>
      <Link to='/edtConductor'>
      <Button variant="success" style={{marginRight:"50px", float:"right"}}>Add new Conductor</Button></Link>
      <ConductorDetails />
    </div>
  )
}

export default Conductors
