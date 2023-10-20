import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import fireDb from '../config/firebase'
import Form from 'react-bootstrap/Form';
import React,{useState} from 'react'
import Row from 'react-bootstrap/esm/Row';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/routeAdder.css'

//defining the initial state
const initialState ={
    routeNo: "",
    start:"",
    destination:"",
    startTime:"",
    endTime:"",
    mStop1:"",
    mStop2:"",
    mStop3:"",
    mStop4:"",
    mStop5:"",
    stop1time:"",
    stop2time:"",
    stop3time:"",
    stop4time:"",
    stop5time:""
}

const BusTimeAdder = ({ onClose }) => {
   
  const [state, setState] = useState(initialState);

  const{routeNo,start,destination,startTime,endTime,mStop1,mStop2,mStop3,mStop4,mStop5,stop1time,stop2time,stop3time,stop4time,stop5time} = state;

  const navigate = useNavigate();

  //functions to handle inout data
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  }

  //function to handle form submission
  const handleSubmit = (e) =>{
     e.preventDefault();
     if(!start || !destination || !routeNo || !startTime || !endTime){
        toast.error("Please provide all information")
     }else{
        fireDb.child("timetable").push(state, (err)=>{
            if(err){
                toast.error(err)
            }else{
                toast.success("Rote Added Succesfully")
                setState({
                    routeNo: "",
                    start:"",
                    destination:"",
                    startTime:"",
                    endTime:"",
                    mStop1:"",
                    mStop2:"",
                    mStop3:"",
                    mStop4:"",
                    mStop5:"",
                    stop1time:"",
                    stop2time:"",
                    stop3time:"",
                    stop4time:"",
                    stop5time:""
                })
            }
        })

        onClose();
        setTimeout(()=> navigate("/timetable"), 500)
     }
  }

  return (
    <Card border="#8C53A6" className='custom-card1' style={{marginRight:"50px",marginTop:"50px",marginLeft:"500px",marginBottom:"10px",width:"40%", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:"tranparent",zIndex:"1"}}>
      <Card.Header style={{backgroundColor:"#8C53A6", color:"white"}}>Add New Time</Card.Header>
      <Card.Body>
       <Form style={{padding:"15px"}} onSubmit={handleSubmit}>
         <Form.Group className="mb-2" controlId="origin">
           <Form.Label>Route No :</Form.Label>
           <Form.Control type="number" name='routeNo' value={routeNo || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
          </Form.Group>
         <Row>
           <Col>
             <Form.Group className="mb-2" controlId="origin">
               <Form.Label>Start :</Form.Label>
               <Form.Control type="text" name='start' value={start || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
             </Form.Group>
           </Col>
           <Col>
             <Form.Group className="mb-2" controlId="origin">
               <Form.Label>Starting Time :</Form.Label>
               <Form.Control type="time" name='startTime' value={startTime || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
             </Form.Group>
           </Col>
         </Row>
         <Row>
           <Col>
            <Form.Group className="mb-2" controlId="origin">
              <Form.Label>Destination :</Form.Label>
              <Form.Control type="text" name='destination' value={destination || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
            </Form.Group>
           </Col>
           <Col>
            <Form.Group className="mb-2" controlId="origin">
              <Form.Label>Reaching Time :</Form.Label>
              <Form.Control type="time" name='endTime' value={endTime || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
            </Form.Group>
           </Col>
         </Row>
         <Row>
           <Col>
             <Form.Group className="mb-2" controlId="origin">
                <Form.Label>Main Stops :</Form.Label>
                <Form.Control type="text" name='mStop1' placeholder='Stop 1' value={mStop1 || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="text" name='mStop2' placeholder='Stop 2'  value={mStop2 || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="text" name='mStop3' placeholder='Stop 3' value={mStop3 || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="text" name='mStop4' placeholder='Stop 4' value={mStop4 || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="text" name='mStop5' placeholder='Stop 5' value={mStop5 || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
             </Form.Group>
           </Col>
           <Col>
             <Form.Group className="mb-2" controlId="origin">
               <Form.Label>Stop Time :</Form.Label>
               <Form.Control type="time" name='stop1time' placeholder='Time 1' value={stop1time || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="time" name='stop2time' placeholder='Time 2' value={stop2time || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="time" name='stop3time' placeholder='Time 3' value={stop3time || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="time" name='stop4time' placeholder='Time 4' value={stop4time || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
               <br/>
               <Form.Control type="time" name='stop5time' placeholder='Time 5' value={stop5time || ""} style={{textAlign:"center"}} onChange={handleInputChange} />
              </Form.Group>
            </Col>
         </Row>
         <br/>
         <input variant="success" type="submit" 
             value="Save"
             name='Save'
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

export default BusTimeAdder
