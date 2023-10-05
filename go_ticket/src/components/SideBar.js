import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faCircleInfo, faMoneyBillTrendUp, faPersonWalking, faPersonWalkingLuggage, faRightFromBracket, faRoute, faTable} from '@fortawesome/free-solid-svg-icons'
const SideBar = () => {
  return (
    <div className="sidebar">
  
    <ul className="sidebar-list">
    <br/> <br/><br/> <br/><br/>
      <li> <Link to ='/' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faBars} style={{marginRight:"10px"}}/>
        Dashboard</Link></li>
      <br/> <br/>

      <li><Link to ='/routes' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faRoute} style={{marginRight:"10px"}}/>
        Routes</Link></li>

      <li><Link to ='/conductors' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faPersonWalking} style={{marginRight:"10px"}}/>
        Conductors</Link></li>

      <li><Link to ='/timetable' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faTable} style={{marginRight:"10px"}}/>
        Time Table</Link></li>
      <br/> <br/>

      <li><Link to ='/passenger' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faPersonWalkingLuggage} style={{marginRight:"10px"}}/>
        Passengers</Link></li>

      <li><Link to ='/finances' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{marginRight:"10px"}} />
        Finances</Link></li>

        <br/> <br/>

        <li><Link to ='/' style={{color:"white", textDecoration:"none"}}>
      <FontAwesomeIcon icon={faCircleInfo} style={{marginRight:"10px"}} />
        About</Link></li>
    </ul>
    <button className='button'> 
    Log Out
    <FontAwesomeIcon icon={faRightFromBracket} rotation={180}  style={{marginLeft:"15px", color:"#666f7f"}}/></button>
  </div>
  )
}

export default SideBar
