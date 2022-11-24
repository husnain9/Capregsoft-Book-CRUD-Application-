import React from 'react'
import {Typography,Box, Grid, TextField, Button } from "@mui/material";
import { deepPurple, green} from '@mui/material/colors';
import List from './students/List'
import axios from "axios";
import { useState } from 'react';
const Home = () => {
  const [book, setBook] = useState({
    book_id:"",
    book_title:'',
    author_name: ""
  });
  const[status, setStatus] = useState();
 
  function onTextFieldChange(e){
    setBook({
      ...book,
      [e.target.name]: e.target.value
    })
  }
   function onFormSubbmit(e){
    e.preventDefault();
    try{
      setStatus(true)
      console.log(book)
       axios.post("https://capregsofttask.herokuapp.com/books/",book);
    }catch(error){
      console.log("something went wrong");
    }
  }
  if(status){
    return <Home/>
  }
  return (
    <>
      <Box textAlign="center"  mb={2}>
        <Typography variant='h2' sx={{color:'white', backgroundColor:deepPurple[400] ,padding:'3px' }}>Capregsoft Task</Typography>
      </Box>
      <Grid container justify="center" spacing={2}>
        <Grid item md={6} xs={12} >
            <Box textAlign="center" p={2} mb={2} sx={{ color:"white", backgroundColor: green[500] }}>
                <Typography variant='h4' >Add Book</Typography>
            </Box>
            <form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}  >
                        <TextField autoComplete='book_id' name='book_id' variant='outlined' required fullWidth id='book_id' label="Book ID" 
                        onChange={e => onTextFieldChange(e)}/>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField autoComplete='book_title' name='book_title' variant='outlined' required fullWidth id='book_title' label="Book Title"
                        onChange={e => onTextFieldChange(e)} />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField autoComplete='author_name' name='author_name' variant='outlined' required fullWidth id='author_name' label="Author Name"
                        onChange={e => onTextFieldChange(e)} />
                    </Grid>
                </Grid>
                <Box m={3}>
                    <Button type='submit' variant='contained' color='primary' fullWidth onClick={(e) => onFormSubbmit(e)}>Add</Button>
                </Box>
            </form>
        </Grid>
        <Grid item md={6} xs={12} >
            <List/>
        </Grid>
      </Grid>
    </>
  )
}

export default Home

