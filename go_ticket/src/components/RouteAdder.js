import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import fireDb from '../config/firebase'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import '../styles/routeAdder.css'

const initialState ={
    origin: "",
    destination:"",
    routeNo:"",
    NoOfBus:"",
    fare:""
}

const RouteAdder = ({ onClose }) => {
   
  const [state, setState] = useState(initialState);

  const{origin,destination,routeNo,NoOfBus,fare} = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) =>{
     e.preventDefault();
     if(!origin || !destination || !routeNo || !NoOfBus || !fare){
        toast.error("Please provide all information")
     }else{
        fireDb.child("routes").push(state, (err)=>{
            if(err){
                toast.error(err)
            }else{
                toast.success("Rote Added Succesfully")
                setState({
                    origin: "",
                    destination:"",
                    routeNo:"",
                    NoOfBus:"",
                    fare:""
                })
            }
        })

        onClose();
        setTimeout(()=> navigate("/routes"), 500)
     }
  }

  return (
    <Card border="#8C53A6" className='custom-card1' style={{marginRight:"50px",marginTop:"50px",marginLeft:"500px",width:"40%", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:"tranparent",zIndex:"1"}}>
      <Card.Header style={{backgroundColor:"#8C53A6", color:"white"}}>Add New Route</Card.Header>
      <Card.Body>
      <Form style={{padding:"15px"}} onSubmit={handleSubmit}>
      <Form.Group className="mb-2" controlId="origin">
        <Form.Label>Origin :</Form.Label>
        <Form.Control type="text" name='origin' value={origin || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="destination">
        <Form.Label>Destination :</Form.Label>
        <Form.Control type="text" name='destination' value={destination || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="routeNo">
        <Form.Label>Route Number :</Form.Label>
        <Form.Control type="number"  name='routeNo' value={routeNo || ""} style={{textAlign:"center"}}  onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-2" controlId="NoOfBus">
        <Form.Label>Number of Busses per Route :</Form.Label>
        <Form.Control type="number" name='NoOfBus' value={NoOfBus || ""} style={{textAlign:"center"}}   onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-2" controlId="seats">
        <Form.Label>Bus Fare :</Form.Label>
        <Form.Control type="number" name='fare' value={fare || ""} style={{textAlign:"center",zIndex:"2"}}   onChange={handleInputChange} />
      </Form.Group>
      <input variant="success" type="submit" 
      value="Save"
      style={{   
         width:" 50%",
        backgroundColor:"#429e7f",
        color: "white",
        margin: "14px, 20px",
        border : "none",
        borderRadius: "4px",
        cursor: "pointer",
        padding: "8px"}}
        />
    </Form>
    
      </Card.Body>
    </Card>
  )
}

export default RouteAdder
