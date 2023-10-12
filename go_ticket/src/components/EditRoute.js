import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import fireDb from '../config/firebase'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';
import './routeAdder.css'

const initialState ={
    origin: "",
    destination:"",
    routeNo:"",
    NoOfBus:"",
    fare:""
}

const EditRoute = () => {
   
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({})

  const{origin,destination,routeNo,NoOfBus,fare} = state;

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    fireDb.child("routes").on("value", (snapshot) => {
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

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  }

  const handleSubmit = (e) =>{
     e.preventDefault();
     if(!origin || !destination || !routeNo || !NoOfBus || !fare){
        toast.error("Please provide all information")
     }else{
        if(!id){
          fireDb.child("routes").push(state, (err)=>{
            if(err){
               toast.error(err)
            }else{
              <Alert variant="success" style={{ zIndex: 1000 }}>
              Conductor Details Succesfully Added
            </Alert>
            }
        })
        }else{
          fireDb.child(`routes/${id}`).set(state, (err)=>{
            if(err){
              toast.error(err)
            }else{
              toast.success("Contact Updated Succesfully")
            }
          })
        }

        setTimeout(()=> navigate("/routes"), 500)
     }
  }

  return (
    <div>
      <br/>
      <h2 style={{
        marginTop:"0px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"250px"
      }}>Edit Routes</h2>
    <div>
    <Card border="#8C53A6" className='custom-card1' style={{marginRight:"100px",marginTop:"50px",marginLeft:"500px",width:"40%", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',background:"tranparent",zIndex:"1"}}>
      <Card.Header style={{backgroundColor:"#8C53A6", color:"white"}}>Update Route</Card.Header>
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
      value={id ? "Update" : "Save"}
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
    </div>
    </div>
  )
}

export default EditRoute
