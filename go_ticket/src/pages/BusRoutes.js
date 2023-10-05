import React from 'react'
import RouteAdder from '../components/RouteAdder'


const BusRoutes = () => {
  return (
    <div>
      <br/><br/>
      <h2 style={{
        marginTop:"30px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"250px"
      }}>Available Routes</h2>
      <RouteAdder/>
    </div>
  )
}

export default BusRoutes
