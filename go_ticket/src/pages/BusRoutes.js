import React,{useState} from 'react'
import RouteAdder from '../components/RouteAdder'
import DisplayRoute from '../components/DisplayRoute'
import Button from 'react-bootstrap/Button'

const BusRoutes = () => {

  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <br/><br/>
      <h2 style={{
        marginTop:"0px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"280px"
      }}>Available Routes</h2>
    
     <div>
     <Button onClick={openForm} variant="success" style={{marginRight:"60px", float:"right",marginBottom:"20px"}}>Add new Route</Button>
     {showForm && <RouteAdder onClose={closeForm} />}
     </div>
      <div>
        <DisplayRoute/>
      </div>
    </div>
  )
}

export default BusRoutes
