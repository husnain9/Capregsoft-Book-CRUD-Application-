import React from 'react'
import {Typography,Box, Grid, TextField, Button } from "@mui/material";
import { deepPurple, green} from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const Edit = () => {
  const {id} = useParams();
  
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  useEffect(()=>{
    getStudent(id);
  },[id])
  async function getStudent(id){
    try{
      const books = await axios.get(`https://capregsofttask.herokuapp.com/books/${id}`);
      
      setBook(books.data);
    }catch(error){
      console.log("something wet wrong")
    }

  }
  function onTextFieldChange(e){
    setBook({
      ...book,
      [e.target.name]: e.target.value
    })
  }
  async function onFormSubbmit(e,id){
    e.preventDefault();
    console.log(id)
    try{
      await axios.put(`https://capregsofttask.herokuapp.com/books/${id}`,book);
      navigate("/")
    }catch(error){
      console.log("something went wrong");
    }
  }

function handleClick(){
  navigate("/")
}
  return (
    <>
      <Box textAlign="center"  mb={2}>
        <Typography variant='h2' sx={{color:'white', backgroundColor:deepPurple[400] ,padding:'3px' }}>React CRUD with API call</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12} sx={{ m: 'auto' }} >
            <Box textAlign="center" p={2} mb={2} sx={{ color:"white", backgroundColor: green[500] }}>
                <Typography variant='h4' >Edit Student</Typography>
            </Box>
            <form noValidate>
            <Grid container spacing={2}>
                    <Grid item xs={6}  >
                        <TextField autoComplete='id' name='id' variant='outlined' required fullWidth id='id'  autoFocus value={book.id} label="ID" disabled />
                    </Grid>
                    <Grid item xs={6}  >
                        <TextField autoComplete='book_id' name='book_id' variant='outlined' required fullWidth id='book_id'  autoFocus 
                        value={book.book_id} label="Book ID" onChange={e => onTextFieldChange(e)} />
                    </Grid>
                    <Grid item xs={12}  >
                        <TextField autoComplete='book_title' name='book_title' variant='outlined' required fullWidth id='book_title' label="Book Title" 
                        value={book.book_title} onChange={e => onTextFieldChange(e)}/>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField autoComplete='author_name' name='author_name' variant='outlined' required fullWidth id='author_name' label="Author Name" 
                        value={book.author_name} onChange={e => onTextFieldChange(e)}/>
                    </Grid>
                </Grid>
                <Box m={3}>
                    <Button type='submit' variant='contained' color='primary' fullWidth onClick={(e) => onFormSubbmit(e,id)}>Update</Button>
                </Box>
            </form>
            <Box m={3} textAlign="center">
        <Button variant='contained' color='primary' onClick={handleClick}>
          Back to Home
        </Button>
      </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Edit
