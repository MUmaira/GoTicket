import React from 'react'
import DashboardCard from '../components/DashboardCard'

function Dashboard() {
  return (
    <div>
      <br/>
      <h2 style={{
        marginTop:"20px",
        color:"#5A5A5A",
        textAlign:"left",
        marginLeft:"250px"
      }}>Dashboard</h2>
      <div>
        <DashboardCard />
      </div>

    </div>
  )
}

export default Dashboard
