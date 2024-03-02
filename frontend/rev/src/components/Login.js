import React from 'react'
import { Form, redirect, useNavigate} from 'react-router-dom'
import { Register } from './Register'
import axios from 'axios';
import qs from 'qs';
import {useState} from 'react'
import {useCookies} from 'react-cookie'

export const Login = () => {
  console.log(process.env.REACT_APP_API_ENDPOINT);

  const [formvalue, uformvalue] = useState({username:'', password:''});
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  

  const handleSubmit =  async(event)=>{
    
    event.preventDefault(); 
    try{    
      const rp = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}login`, formvalue);
      console.log(rp.data);
      setCookies("token", rp.data.token);
      if(rp.data.token)
      { 
        localStorage.setItem("UserID", formvalue.username);
        navigate('/list');
      
      }
      else
        alert(rp.data.error);
      console.log(rp.data);
      }catch(e){console.log({error: e});}
  }
  

    return (
    <>
        <div>
            <form  onSubmit={handleSubmit}>
              <fieldset>
                Login
                <ul type = "none">

                    <li><label htmlFor = "username">Username<span aria-label="required">*</span> : <input name = "username" type="text" id="username" required onChange = {(e)=>{uformvalue({...formvalue, username: e.target.value})}}/></label></li>
                    <li><label htmlFor = "password"> Password<span aria-label="required">*</span> : <input name = "password" type="password" id = "password" required onChange = {(e)=>{uformvalue({...formvalue, password: e.target.value})}}/></label></li>

                    <li><button type = "submit ">Login</button></li>
              
                </ul>
                </fieldset>
            </form>
        </div>
      
    </>
  )
}

// export const createAction = async ({request})=>{
//   console.log(request, typeof(request));

//   const data = await request.formData();

//   const submission = {
//     username : data.get('username'),
//     password : data.get('password')
//   }

//   console.log(submission);

//   let frmdata = new FormData();
//   frmdata.set('username', submission.username);
//   frmdata.set('password', submission.password);
//   console.log(frmdata);
//   console.log(JSON.stringify(submission), 'json');

//   const response = await fetch("http://localhost:3001/login", {

//       method : "POST",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       redirect: 'follow',
//       referrerPolicy: "no-referrer", 
//       body: qs.stringify(submission),

      

//   }).then((res)=>{
//     console.log(res.cookie,"res");
//     return res.json()}).then((val)=>{console.log(val, 'hi')});

//     // const rp = await axios.post("http://localhost:3001/login", submission)
//     //     console.log(rp.data);

//   return redirect('/list');
// }

