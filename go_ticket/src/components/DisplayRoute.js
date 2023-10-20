import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import fireDb from'../config/firebase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React,{ useState,useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify'
import '../styles/tableStyles.css'

const DisplayRoute = () => {
  
  const [seletedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState({});

  //fetching route details from the database
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

  //deleting route details from the database
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

  const toggleDetails = (rowId) =>{
    setSelectedRow(seletedRow === rowId ? null : rowId)
  };

  return (
    <div>
    <table id='emp'>
            <thead>
              <tr>
                <th style={{textAlign:"center"}}>Route ID</th>
                <th style={{textAlign:"center"}}>Route No</th>
                <th style={{textAlign:"center"}}>Fare (RS)</th>
                <th style={{textAlign:"center"}}>No of Buses</th>
                <th style={{textAlign:"center"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id,index) => {
                return(
                <React.Fragment key={id}>
                  <tr onClick={()=> toggleDetails(data[id])}>
                    <td>R00{index + 1}</td>
                    <td>{data[id].routeNo}</td>
                    <td>Rs.{data[id].fare}</td>
                    <td>{data[id].NoOfBus}</td>
                    <td>
                      <span>
                        <Link to={`/routes/${id}`}>
                        <FontAwesomeIcon icon={faPenToSquare}  style={{color:"black"}}/>
                        </Link>
                      </span>
                      <span>
                      <button style={{ backgroundColor: "transparent",border: "none"}} onClick={()=> OnDelete(id)}>
                      <FontAwesomeIcon icon={faTrash} />
                      </button>
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faEye}  style={{color:"black", cursor:"pointer"}}/>
                      </span>
                    </td>
                  </tr>
                  {seletedRow === data[id] && (
                    <tr>
                       <td colSpan="5" style={{padding:"20px"}}>
                        Origin: {data[id].origin} | Destination: {data[id].destination}
                       </td>
                    </tr>
                  )}
                  
                </React.Fragment>
                )
             })}
            </tbody>
      </table>
     <ToastContainer/>
  </div>
  )
}

export default DisplayRoute
