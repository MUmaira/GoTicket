import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import fireDb from '../config/firebase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row'
import {ToastContainer,toast} from 'react-toastify'
import '../styles/cardStyles.css'


const ConductorDetails = () => {

 const[data, setData] = useState({});

 //fetching coonductor data form the database
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
  }, [])

  //deleting conductor data from the database
  const OnDelete = (id) =>{
    if(window.confirm("Are sure you want to delete? ")){
      fireDb.child(`conductors/${id}`).remove((err) =>{
        if(err){
          toast.error(err)
        }else{
          toast.warning("Conductor details deleted")
        }
      })
    }
  }

  console.log(data)

  return (
    <div>
    <Row xs={1} md={3} className="g-4"style={{marginLeft:"250px", marginTop:"50px", padding:"15px"}}>
     {Object.keys(data).map((id,index) => {
        return(
            <Col key={id}>
              <Card border="#9566ab" className='custom-card'
               style={{ width: '18rem',marginLeft:"50px",zIndex:"1",backgroundColor:"transparent" }}>
                <Card.Header style={{backgroundColor:"#9566ab",fontWeight:"bold"}}>C00{index + 1}</Card.Header>
                <Card.Body>
                  <Card.Title>{data[id].firstName}  {data[id].lastName} </Card.Title>
                  <Card.Text>
                    contact number: {data[id].contact} <br/>
                    Rote From : {data[id].routeFrom} <br/>
                    Route To  : {data[id].routeTo} <br/>
                    Bus No    :  {data[id].busNo} <br/>
                  </Card.Text>
                  <Link to={`/edtConductor/${id}`}>
                  <Button variant="secondary">
                  <FontAwesomeIcon icon={faPenToSquare} style={{color: "#ffffff",}} />
                  </Button></Link>
                  <Button variant="danger" style={{marginLeft:"20px"}}  onClick={()=> OnDelete(id)}>
                  <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
      } )}
   </Row>
   <ToastContainer/>
   </div>    
  )
}

export default ConductorDetails
