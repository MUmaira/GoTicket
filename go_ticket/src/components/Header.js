import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  return (
    <div className='header'>
        <p className='logo'>Go Ticket</p>
        <div className='header-right'>
             <p> <Link to='/account' className='account-link' style={{marginTop:"30px"}}>
                <FontAwesomeIcon icon={faUser}/> My Account
                </Link></p>
        </div>
      
    </div>
  )
}

export default Header
