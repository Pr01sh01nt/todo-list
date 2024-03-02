import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const List = () => {
  const [note, setNote] = useState("");

  const save = async()=>{

    try{
      // console.log(localStorage.getItem("UserID"));
        const result = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}list`,{note: note, username:localStorage.getItem("UserID")});
       console.log(result.data); 
    }catch(e){
      console.log(e);
    }
  }

  return (
   <>

   
    <div className='list'>
 
    <input onChange = {(e)=>{setNote(e.target.value)}}/>
   
    <button onClick = {save}>Save</button>
    </div>
    
   
   </>
  )
}

export{  List}
