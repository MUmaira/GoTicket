import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import fireDb from '../config/firebase';
import {toast} from 'react-toastify'
import Alert from 'react-bootstrap/Alert';
import '../styles/routeAdder.css'

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
    const [data, setData] = useState({})

    const {firstName, lastName,routeFrom,routeTo,contact,busNo} = state;

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
      fireDb.child("conductors").on("value", (snapshot) => {
        if(snapshot.val() !== null){
            setData({...snapshot.val() });
        }else{
          setData({});
        }
      } )
  
      return () =>{
        setData({})
      }
    }, [id])
  
    useEffect(() =>{
       if(id){
        setState({...data[id]})
       }else{
        setState({...initialState})
       }
  
       return ()=>{
        setState({...initialState})
       }
    },[id,data])

const handleInputChange = (e) =>{
       const {name, value} = e.target;
       setState({...state, [name]:value})
}

const handleSubmit= (e) =>{
    e.preventDefault();
    
    if(!firstName || !lastName || !routeFrom || !routeTo || !contact || !busNo){
      <Alert  variant="danger" style={{ zIndex: 1000 }}>
      Please Fill Out All the Feilds!
    </Alert>
    }else{
      if(!id){
        fireDb.child("conductors").push(state, (err)=>{
          if(err){
             toast.error(err)
          }else{
            <Alert variant="success" style={{ zIndex: 1000 }}>
            Conductor Details Succesfully Added
          </Alert>
          }
      })
      }else{
        fireDb.child(`conductors/${id}`).set(state, (err)=>{
          if(err){
            toast.error(err)
          }else{
            toast.success("Contact Updated Succesfully")
          }
        })
      }

       setTimeout(()=> navigate("/conductors"), 500)  
    }

}

  return (
    <div>
      <br/><br/>
      <h2 style={{
        marginTop:"0px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"280px"
      }}>Edit Conductors</h2>

    <Card border="#8C53A6" className='custom-card1' style={{marginRight:"50px",marginTop:"50px",marginLeft:"500px",marginBottom:"10px",width:"40%", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:"tranparent",zIndex:"1"}}>
      <Card.Header style={{backgroundColor:"#8C53A6", color:"white"}}>Add / Edit Conductor</Card.Header>
      <Card.Body>
      <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" >
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter First name" 
                        name='firstName' value={firstName || ""}
                        onChange={handleInputChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" 
                         name='lastName' value={lastName || ""}
                         onChange={handleInputChange} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Route From : </Form.Label>
        <Form.Control placeholder="City 01" 
                    name='routeFrom' value={routeFrom || ""}  
                    onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Route To :</Form.Label>
        <Form.Control placeholder="City 02"
                      name='routeTo' value={routeTo || ""} 
                      onChange={handleInputChange} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control placeholder='Enter mobile number' 
                        name='contact' value={contact || ""} 
                        onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Bus Number</Form.Label>
          <Form.Control placeholder='Enter Bus Number' 
                        name='busNo' value={busNo || ""} 
                        onChange={handleInputChange}/>
        </Form.Group>
      </Row>
       <br/><br/>
      <input variant="success" type="submit" 
      value={id ? "Update" : "Save"}
      style={{   
         width:" 50%",
        backgroundColor:"#4caf58",
        color: "white",
        margin: "14px, 20px",
        border : "none",
        borderRadius: "4px",
        cursor: "pointer",
        padding: "12px"}}/>
  
    </Form>
    </Card.Body>
    </Card>
    </div>
  )
}

export default EdtConductor
