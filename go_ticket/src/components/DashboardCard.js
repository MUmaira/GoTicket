import React,{useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './dashboardCard.css'
import { faBus, faDownload, faPersonWalking, faRoute } from '@fortawesome/free-solid-svg-icons';
import {getColumnSum, getRecordCount} from '../utils/firebaseUtils'

const DashboardCard = () => {
 
    const [routeCount, setRouteCount] = useState(0);
    const [conductorCount, setConductorCount] = useState(0);
    const [busSum, setSum] = useState(0);

    //function to get and set the no of routes
    useEffect(() =>{
        getRecordCount('routes', count =>{
            if(count !== null){
                setRouteCount(count);
            }
        })
    },[])

    //function to get and set the no of conductors
    useEffect(()=>{
        getRecordCount('conductors', count =>{
             if(count !== null){
                setConductorCount(count);
             }
        })
    },[])

    //function to get and set the no of busses allocated
    useEffect(()=>{
        getColumnSum('routes','NoOfBus', result =>{
            if(result !== null){
                setSum(result);
            }
        })
    },[])

  return (
    <div style={{display:"flex", marginLeft:"320px"}}>
  <div>
   <Card className='custom-card-dashboard' style={{ width: '18rem',marginTop:"20px",boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',background:"transparent",overflow:"hidden",zIndex:"1"  }}>
      <Card.Body>
        <Card.Title>
            Available Routes
            <FontAwesomeIcon icon={faRoute} style={{marginLeft:"10px"}} />
        </Card.Title>
        <Card.Text style={{fontSize:"55px",fontWeight:"bolder"}}>
             {routeCount}
        </Card.Text>
      </Card.Body>
    </Card>
    <br/>
    <Button style={{backgroundColor:"#5f2d66",border:"#9566ab",width:"280px"}}>
       Download Report
       <FontAwesomeIcon icon={faDownload} style={{marginLeft:"10px"}} />
    </Button>
    </div>

    <div>
    <Card className='custom-card-dashboard' style={{ width: '18rem',marginLeft:"100px",marginTop:"20px",boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',background:"transparent",overflow:"hidden",zIndex:"1" }}>
      <Card.Body>
        <Card.Title>
            Buses Allocated
            <FontAwesomeIcon icon={faBus} style={{marginLeft:"10px"}} />
        </Card.Title>
        <Card.Text style={{fontSize:"55px",fontWeight:"bolder"}}>
              {busSum}
        </Card.Text>
      </Card.Body>
    </Card>
    <br/>
    <Button style={{backgroundColor:"#5f2d66",border:"#9566ab",marginLeft:"105px",width:"280px"}}>
        Download Report
        <FontAwesomeIcon icon={faDownload} style={{marginLeft:"10px"}} />
    </Button>
    </div>

    <div>
    <Card className='custom-card-dashboard' style={{ width: '18rem',marginLeft:"100px",marginTop:"20px",boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',background:"transparent",overflow:"hidden",zIndex:"1"  }}>
      <Card.Body>
        <Card.Title>
            Conductors at Work
            <FontAwesomeIcon icon={faPersonWalking} style={{marginLeft:"10px"}} />
        </Card.Title>
        <Card.Text style={{fontSize:"55px",fontWeight:"bolder"}}>
         {conductorCount}
        </Card.Text>
      </Card.Body>
    </Card>
    <br/>
    <Button style={{backgroundColor:"#5f2d66",border:"#9566ab",marginLeft:"105px",width:"280px"}}>
        Download Report
        <FontAwesomeIcon icon={faDownload} style={{marginLeft:"10px"}} />
    </Button>
    </div> 
    </div>
  )
}

export default DashboardCard
