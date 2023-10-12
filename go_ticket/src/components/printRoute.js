import React,{useState, useEffect} from 'react'

const printRoute = () => {
    const[data, setData] = useState({});
    useEffect(()=>{
      fireDb.child("routes").on("value", (snapshot) => {
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
  return (
    <div>
      <table className="styled-table">
      <thead>
        <tr>
          <th>Route No</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Fare</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((id, index) => {
          return(
            <tr key={id}>
            <td>{data[id].routeNo}</td>
            <td>{data[id].origin}</td>
            <td>{data[id].destination}</td>
            <td>{data[id].fare}</td>
          </tr>
          );
        })}
      </tbody>
      </table>
    </div>
  )
}

export default printRoute
