import React from 'react'
import axios from 'axios';
import {useState} from 'react'

export const Register = () => {
  const [formvalue, uformvalue] = useState({username:'', password:'', email:''});
  
  const handleSubmit =  async(event)=>{
    event.preventDefault(); 
    try{
      const rp = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}register`, formvalue);
        console.log(rp);
        console.log(rp.data);
        alert("registred");
      }catch(e){console.log({error: e});}
  }


  

  return (
    <div>
       <form onSubmit = {handleSubmit}>

            <ul type = "none">
              
              <li><label htmlFor='username'>Username<span aria-label="required">*</span> : <input type = "text" name= "username" id = "username" required onChange={(e)=>{uformvalue({...formvalue,  username : e.target.value})}}/>  </label></li>
              <li><label htmlFor='password'>Password<span aria-label="required">*</span> : <input type = "password" name= "password" id = "password" required onChange={(e)=>{uformvalue({...formvalue, password : e.target.value})}}/>  </label></li>
              <li><label htmlFor='email'>Email<span aria-label="required">*</span> : <input type = "email" name= "email" id = "email" required onChange={(e)=>{uformvalue({...formvalue,  email : e.target.value})}}/>  </label></li>
              <li><button type = "submit">Register</button></li>
            </ul>


       </form>
    </div>
  )
}


