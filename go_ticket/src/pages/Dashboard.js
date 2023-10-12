import React,{useState} from 'react'
import DashboardCard from '../components/DashboardCard'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calenderStyles.css'
import lineChart from '../images/lineChart.png'
import pieChart from '../images/pieChart1.png'
import passengerChart from '../images/passengerDetails.png'


function Dashboard() {
 
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) =>{
    setSelectedDate(date);
  }

  const isWeekend = (date) =>{
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  return (
    <div>
      <br/>
      <h2 style={{
        marginTop:"0px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"250px"
      }}>Dashboard</h2>
      <div>
        <DashboardCard />
      </div>
      <div style={{display:"flex",marginLeft:"260px"}}>
        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{marginTop:"10px"}}> Passenger Logins</div>
        <img
         src={pieChart}
        alt="passenger report" 
        style={{ width: '300px', height: '200px',marginTop:"10px" }} 
         />
        
        Passenger Types
        <img
         src={passengerChart}
        alt="sales report" 
        style={{ width: '300px', height: '200px' }} 
        />

       </div>
      <div>
        <img
         src={lineChart}
        alt="sales report" 
        style={{ width: '500px', height: '300px',marginTop:"90px" }} 
      />
      </div>

      <div style={{marginTop:"60px",marginLeft:"30px"}}>
         <Calendar
           onChange={handleDateChange}
           value={selectedDate}
           tileClassName={({date, view}) =>
              isWeekend(date) ? 'weekend-day' : null
          }
         />
      </div>
      
      </div>
    </div>
  )
}

export default Dashboard
