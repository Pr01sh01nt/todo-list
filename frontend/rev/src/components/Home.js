import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import {useState} from 'react'
import {List} from './List.js'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import {useCookies} from 'react-cookie'

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(10 10 10 10)',
  clipPath: 'inset(50%)',
  height: 100,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 10,
  left: 10,
  whiteSpace: 'nowrap',
  width: 100,

});

export const Home = () => {

  const [_, setCookies] = useCookies(["token1"]);

  
  return (
    <>
        
      <h1>This is Home page</h1>
     
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
   
   
    <div>
    <IconButton aria-label="delete" onClick = {()=>{setCookies("token1", "tk1")}}>
  <DeleteIcon />
</IconButton>
        <Link to = "login"><Button variant="eleveted"  startIcon={<DeleteIcon />} >Login</Button></Link>
        <Link to = "register"><Button variant="contained" color="success" endIcon={<SendIcon />}>Register</Button></Link>
        <Outlet/>
    </div>
    </>
  )
}
