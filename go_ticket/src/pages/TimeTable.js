import React,{useState} from 'react'
import BusTimeAdder from '../components/BusTimeAdder';
import Button from 'react-bootstrap/Button';


const TimeTable = () => {
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
    }}>Bus Time Table</h2>
  
   <div>
   <Button onClick={openForm} variant="success" style={{marginRight:"60px", float:"right",marginBottom:"20px"}}>New Time Info</Button>
   {showForm && <BusTimeAdder onClose={closeForm} />}
   </div>
   
  </div>
  )
}

export default TimeTable
