import React from 'react'
import axios from 'axios';


export const ShowList = ({item}) => {
  
     console.log({item});
     const deleteItem = async()=>{
          try{
            console.log(item);
              const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}delete`,{withCredentials: true, params:{id:item._id}});
              console.log(response); 
          }catch(err){
            console.log(err);
          }
     }
  
    return (
    <>
    <h3>

     {item.note}
     <button onClick = {deleteItem}>Delete</button>
    </h3>
    </>
  )
}

