import React from 'react'
import {useNavigate}  from 'react-router-dom';
import {useState, useEffect} from 'react'
import axios from 'axios';
import {ListHome} from './ListHome.js';






export const Auth = () => {
  const [result, setResult] = useState("");
  const navigate = useNavigate(); 


  useEffect(()=>{
  const fun = async()=>{
    try{
    const result = await  axios.get(`${process.env.REACT_APP_API_ENDPOINT}`, { withCredentials: true }).then((res)=>res.data);
    console.log(result,"RES");
    setResult(result);
    
    }catch(e){console.log(e);}
    }
    fun();
  }, [])
  
  return (
    <>
      
        {/* <h1>{result.ok}</h1> */}
      {result.ok==='1'?<ListHome/> : navigate('/login')}
     

     
    </>
  )
}


