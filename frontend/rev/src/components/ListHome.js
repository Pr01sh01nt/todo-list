import React, {useState} from 'react'
import  {List} from './List' 
import {ShowList} from './ShowList.js';
import axios from 'axios'

export const ListHome = () => {
  
    const [listCount, setListCount] = useState(0);
  const [list, setList] = useState([]);
  const [listItems, setListItems] = useState([]);

  const show = async()=>{
    const result = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}list`,{withCredentials:true,
    params : {
    username:localStorage.getItem("UserID")}
        }).then(res=>res.data);
    console.log(result.listItems);
    setListItems(result.listItems);
  }
  
  
    
  function counter(){
    setList( prevList => ([...prevList, {id : listCount+1}]));
    setListCount(listCount+1);
  }
  
  
  function remove(id){
    setList(list.filter((value)=> id !== value.id));
    setListCount(listCount-1);
  }
  
    return (
    <>
        

        <button onClick = {counter}>Add</button> 
        <button onClick = {show}>Show My List</button>
        {listCount !== 0 && <List />}

        {listItems.map(val=><ShowList key={val._id} item = {val}/>)}
    </>
  )
}

