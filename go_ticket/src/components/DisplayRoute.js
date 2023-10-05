import React,{useState,useEffect} from 'react'
import './tableStyles.css'
import fireDb from'../config/firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const DisplayRoute = () => {

    
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

  const OnDelete = (id) =>{
    if(window.confirm("Are sure you want to delete? ")){
      fireDb.child(`routes/${id}`).remove((err) =>{
        if(err){
          toast.error(err)
        }else{
          toast.warning("Contact has been deleted")
        }
      })
    }
  }

  return (
    <table className='styled-table'>
            <thead>
              <tr>
                <th style={{textAlign:"center"}}>No</th>
                <th style={{textAlign:"center"}}>Route</th>
                <th style={{textAlign:"center"}}>Fare</th>
                <th style={{textAlign:"center"}}>No of Buses</th>
                <th style={{textAlign:"center"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id,index) => {
                return(
                  <tr key={id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{data[id].routeNo}</td>
                    <td>{data[id].fare}</td>
                    <td>{data[id].NoOfBus}</td>
                    <td>
                      <Link to={`/routes/${id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                      <button className='btn btn-delete' onClick={()=> OnDelete(id)}>Delete</button>
                      <Link to={`/view/${id}`}>
                        <button className='btn btn-view'>View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
      </table>
  )
}

export default DisplayRoute
