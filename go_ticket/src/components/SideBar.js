import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBus, faCircleInfo, faMoneyBillTrendUp, faPersonWalking, faPersonWalkingLuggage, faRightFromBracket, faRoute, faTable} from '@fortawesome/free-solid-svg-icons'
const SideBar = () => {
  return (
    <div className="sidebar">

      <div className='sidebar-header'>
        Go Ticket
      </div>
    <FontAwesomeIcon icon={faBus} size="2xl" style={{color: "#808999",marginTop:"10px",height:"45px"}} />
    <ul className="sidebar-list" style={{marginTop:"50px"}}> 
     
      <li> <Link to ='/' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faBars} style={{marginRight:"10px"}}/>
        Dashboard</Link></li>
      {/*<br/> <br/>*/}

      <li><Link to ='/routes' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faRoute} style={{marginRight:"10px",marginLeft:"-30px"}}/>
        Routes</Link></li>

      <li><Link to ='/conductors' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faPersonWalking} style={{marginRight:"10px"}}/>
        Conductors</Link></li>

      <li><Link to ='/timetable' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faTable} style={{marginRight:"10px",marginLeft:"-16px"}}/>
        Bus Times</Link></li>
      {/*<br/> <br/>*/}

      <li><Link to ='/passenger' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faPersonWalkingLuggage} style={{marginRight:"10px"}}/>
        Passengers</Link></li>

      <li><Link to ='/finances' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{marginRight:"10px",marginLeft:"-19px"}} />
        Finances</Link></li>

        <li><Link to ='/' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faCircleInfo} style={{marginRight:"10px",marginLeft:"-38px"}} />
        About</Link></li>
    </ul>
    <button className='button'> 
    Log Out
    <FontAwesomeIcon icon={faRightFromBracket} rotation={180}  style={{marginLeft:"15px", color:"#666f7f"}}/></button>
  </div>
  )
}

export default SideBar
