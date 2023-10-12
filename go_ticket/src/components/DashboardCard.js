import React,{useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './dashboardCard.css'
import { faBus, faDownload, faPersonWalking, faRoute } from '@fortawesome/free-solid-svg-icons';
import {getColumnSum, getRecordCount} from '../utils/firebaseUtils'
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import fireDb from '../config/firebase'

const DashboardCard = () => {
 
    const [routeCount, setRouteCount] = useState(0);
    const [conductorCount, setConductorCount] = useState(0);
    const [busSum, setSum] = useState(0);

    const [data, setData] = useState({});
    const [conductor, setConductor] = useState({});
    const [time,setTime]= useState({});

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

   //fetching route data to diaplay in report
   useEffect(() => {
    fireDb.child("routes").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        const dataArray = Object.values(snapshot.val());
        setData(dataArray);
      } else {
        setData([]);
      }
    });
  
    return () => {
      setData([]);
    };
  }, []);

    //generatingRouteReport
    const generateRouteReport = () => {
      if (!Array.isArray(data)) {
        console.error("Data is not an array. Cannot generate the report.");
        return;
      }
      const doc = new jsPDF();
  
      // Add the report title to the PDF
      doc.setFontSize(18);
      doc.text("Route Details Report", 14, 22);
  
      // Add the current date to the PDF
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      doc.setFontSize(12);
      doc.text(`Report generated on ${date}`, 14, 32);
  
      const columns = [
        "Route Number",
        "Origin",
        "Destination",
        "Fare",
      ];
      const rows = data.map(
        ({ routeNo, origin, destination, fare, createdAt }) => [
          routeNo,
          origin,
          destination,
          fare,
          new Date(createdAt).toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        ]
      );
  
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 40,
        styles: {
          fontSize: 12, // Set font size for table content
          cellPadding: 3, // Set cell padding for table cells
        },
      });
  
      doc.save("Route_report.pdf");
    };

    //fetching details to  display in the conductors report
    useEffect(() => {
      fireDb.child("conductors").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          const dataArray = Object.values(snapshot.val());
          setConductor(dataArray);
        } else {
          setConductor([]);
        }
      });
    
      return () => {
        setConductor([]);
      };
    }, []);

 //generating conductor details report
    const generateConductorReport = () => {
      if (!Array.isArray(conductor)) {
        console.error("Data is not an array. Cannot generate the report.");
        return;
      }
      const doc = new jsPDF();
  
      // Add the report title to the PDF
      doc.setFontSize(18);
      doc.text("Conductor Details Report", 14, 22);
  
      // Add the current date to the PDF
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      doc.setFontSize(12);
      doc.text(`Report generated on ${date}`, 14, 32);
  
      const columns = [
        "First Name",
        "Assigned Bus No",
        "Route From",
        "Route To",
        "Contact Number"
      ];
      const rows = conductor.map(
        ({ firstName, busNo, routeFrom, routeTo, contact,createdAt }) => [
          firstName,
          busNo,
          routeFrom,
          routeTo,
          contact,
          new Date(createdAt).toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        ]
      );
  
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 40,
        styles: {
          fontSize: 12, // Set font size for table content
          cellPadding: 3, // Set cell padding for table cells
        },
      });
  
      doc.save("Conductor_report.pdf");
    };

    //function to fetch bus Time data
    useEffect(() => {
      fireDb.child("timetable").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          const dataArray = Object.values(snapshot.val());
          setTime(dataArray);
        } else {
          setTime([]);
        }
      });
    
      return () => {
        setTime([]);
      };
    }, []);

    //generating bus time report
    const generateBusTimeReport = () => {
      if (!Array.isArray(time)) {
        console.error("Data is not an array. Cannot generate the report.");
        return;
      }
      const doc = new jsPDF();
  
      // Add the report title to the PDF
      doc.setFontSize(18);
      doc.text("Bus Times", 14, 22);
  
      // Add the current date to the PDF
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      doc.setFontSize(12);
      doc.text(`Report generated on ${date}`, 14, 32);
  
      const columns = [
        "Route Number",
        "Start",
        "Starting Time",
        "Destination",
        "Reaching Time"
      ];
      const rows = time.map(
        ({ routeNo, start, startTime, destination, endTime,createdAt }) => [
          routeNo,
          start,
          startTime,
          destination,
          endTime,
          new Date(createdAt).toLocaleString("en-US", {
            dateStyle: "short",
            timeStyle: "short",
          }),
        ]
      );
  
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 40,
        styles: {
          fontSize: 12, // Set font size for table content
          cellPadding: 3, // Set cell padding for table cells
        },
      });
  
      doc.save("Bus_Time_report.pdf");
    };


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
    <Button onClick={generateRouteReport} style={{backgroundColor:"#5f2d66",border:"#9566ab",width:"280px"}} >
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
    <Button onClick={generateBusTimeReport} style={{backgroundColor:"#5f2d66",border:"#9566ab",marginLeft:"105px",width:"280px"}}>
        Download Bus Times
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
    <Button onClick={generateConductorReport} style={{backgroundColor:"#5f2d66",border:"#9566ab",marginLeft:"105px",width:"280px"}}>
        Download Report
        <FontAwesomeIcon icon={faDownload} style={{marginLeft:"10px"}} />
    </Button>
    </div> 
    </div>
  )
}

export default DashboardCard
