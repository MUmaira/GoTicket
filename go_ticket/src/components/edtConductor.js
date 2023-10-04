import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import fireDb from '../config/firebase';
import {toast} from 'react-toastify'

const initialState ={
    firstName : "",
    lastName : "",
    routeFrom : "",
    routeTo : "",
    contact : "",
    busNo : ""
}

const EdtConductor = () => {
    const[state, setState] = useState(initialState);
    //const [data, setData] = useState({})

    const {firstName, lastName,routeFrom,routeTo,contact,busNo} = state;

    const navigate = useNavigate();

const handleInputChange = (e) =>{
       const {name, value} = e.target;
       setState({...state, [name]:value})
}

const handleSubmit= (e) =>{
    e.preventDefault();
    
    if(!firstName || !lastName || !routeFrom || !routeTo || !contact || !busNo){
        toast.error("Please provide values for each input feild")
    }else{
            fireDb.child("conductors").push(state, (err)=>{
                if(err){
                   toast.error(err)
                }else{
                    toast.success("Conductor Details Added Succesfully!")
                }
            })
       setTimeout(()=> navigate("/conductors"), 500)  
    }

}

  return (
    <div>
      <h2 style={{
        marginTop:"30px",
        fontSize:"large",
        color:"#5A5A5A"
      }}>Edit Conductor</h2>
      <Form style={{marginLeft:"350px",
                    marginRight:"250px",
                    marginTop : "50px",
                    border:"1px solid #5A5A5A",
                    borderRadius:"10px",
                    paddingTop:"30px",
                    paddingBottom:"30px",
                    paddingRight:"50px",
                    paddingLeft:"50px"}}
                    onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First name" 
                        name='firstName' value={firstName}
                        onChange={handleInputChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" 
                         name='lastName' value={lastName}
                         onChange={handleInputChange} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Route From : </Form.Label>
        <Form.Control placeholder="City 01" 
                    name='routeFrom' value={routeFrom}  
                    onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Route To :</Form.Label>
        <Form.Control placeholder="City 02"
                      name='routeTo' value={routeTo} 
                      onChange={handleInputChange} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control placeholder='Enter mobile number' 
                        name='contact' value={contact} 
                        onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Bus Number</Form.Label>
          <Form.Control placeholder='Enter Bus Number' 
                        name='busNo' value={busNo} 
                        onChange={handleInputChange}/>
        </Form.Group>
      </Row>
       <br/><br/>
      <Button variant="success" type="submit">
        Add Details
      </Button>
    </Form>
    </div>
  )
}

export default EdtConductor
