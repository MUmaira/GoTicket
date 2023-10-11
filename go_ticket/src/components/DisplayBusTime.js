import React,{useState,useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBusSimple, faChevronDown, faChevronUp, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import fireDb from '../config/firebase'
import {toast} from 'react-toastify'
import './TimeContainer.css'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';

const DisplayBusTime = () => {
    const [isOpen, setIsOpen] = useState(false);
    const[data, setData] = useState({});

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
      };
   
      useEffect(()=>{
        fireDb.child("timetable").on("value", (snapshot) => {
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

    const OnDelete = (id) =>{
        if(window.confirm("Are sure you want to delete? ")){
          fireDb.child(`timetable/${id}`).remove((err) =>{
            if(err){
              toast.error(err)
            }else{
              toast.warning("Contact has been deleted")
            }
          })
        }
    }
      
    

  console.log(data);
  return (
 <div >
   {Object.keys(data).map((id)=> {
    return(
    <React.Fragment key={id}>
      <div className='container1'onClick={toggleAccordion} >
      <div style={{color:"white",marginLeft:"50px"}}>
        <h3><FontAwesomeIcon icon={faBusSimple}  />      {data[id].routeNo}</h3>
        </div>
        <div style={{color: "white", marginLeft: "750px"}}>
           {data[id].start} to {data[id].destination}
        </div>
        <div style={{color:"white",marginRight:"40px"}}>
           <Link to={`/timetable/${id}`}>
           <FontAwesomeIcon icon={faPen} style={{marginLeft:"20px",color:"white"}}/>
           </Link>

           <button style={{ backgroundColor: "transparent",border: "none",marginLeft:"40px"}} onClick={()=> OnDelete(id)}>
             <FontAwesomeIcon icon={faTrash} style={{color:"white"}} />
           </button>
        </div>
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} style={{marginRight:"30px",color:"white"}}/>
      </div>
      {isOpen && (
        <div style={{ border: '1px solid black', padding: '10px',marginLeft:"250px",marginRight:"82px",borderRadius:"10px" }}>
        <Row gutter={2}>
            <Col>
               Starting From: 
            </Col>
            <Col>
                {data[id].start}
            </Col>
            |
            <Col>
                Starting at:
            </Col>
            <Col>
                {data[id].startTime}
            </Col>
            |
            <Col>
                Destination:
            </Col>
            <Col>
                {data[id].destination}
            </Col>
            |
            <Col>
                Reaching at:
            </Col>
            <Col>
                {data[id].endTime}
            </Col>
        </Row>
        <Row gutter={2}>
            <Col>
               Main Stop 1: 
            </Col>
            <Col>
                {data[id].mStop1}
            </Col>
            |
            <Col>
                Reaching at:
            </Col>
            <Col>
                 {data[id].stop1time}
            </Col>
            |
            <Col>
                Main Stop 2:
            </Col>
            <Col>
               {data[id].mStop2}
            </Col>
            |
            <Col>
                Reaching at:
            </Col>
            <Col>
               {data[id].stop2time}
            </Col>
        </Row>
        <Row gutter={2}>
            <Col>
               Main Stop 3: 
            </Col>
            <Col>
               {data[id].mStop3}
            </Col>
            |
            <Col>
                Reaching at:
            </Col>
            <Col>
               {data[id].stop3time}
            </Col>
            |
            <Col>
                Main Stop 4:
            </Col>
            <Col>
                {data[id].mStop4}
            </Col>
            |
            <Col>
                Reaching at:
            </Col>
            <Col>
               {data[id].stop4time}
            </Col>
        </Row>
        <Row gutter={2}>
            <Col>
               Main Stop 5: 
            </Col>
            <Col>
                {data[id].mStop5}
            </Col>
            |
            <Col>
                Reaching at:
            </Col>
            <Col>
               {data[id].stop5time}
            </Col>
            |
            <Col>
                
            </Col>
            <Col>
            
            </Col>
            
            <Col>
                
            </Col>
            <Col>
                
            </Col>
        </Row>
        
      </div>
    )}
   
  </React.Fragment>
  )
})}
    
  </div>
  )
}

export default DisplayBusTime
