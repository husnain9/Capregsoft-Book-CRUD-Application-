import React from 'react';
import {Typography,Box, TableContainer,Table, TableBody, TableCell,
  TableHead,TableRow,Paper, Button } from "@mui/material"; 
import { orange} from '@mui/material/colors';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const View = () => {
  const {id} = useParams();
  
  const navigate = useNavigate();

  const [books, setBook]= useState([]);
  useEffect(()=>{
      getAllBook()
  },[]);

  async function getAllBook(){
      try{
          const books = await axios.get(`https://capregsofttask.herokuapp.com/books/${id}`);
          setBook(books.data);
      }catch(error){
         console.log("something wentt wrong");
      }
  } 

function handleClick(){
  navigate("/")
}
  return (
    <>
      <Box textAlign="center" p={2} mb={2} sx={{ color:"white", backgroundColor: orange[500] }}>
        <Typography variant='h4'  >Avaiable Books</Typography>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor: '#616161' }}>
              <TableCell align='center' >Sr</TableCell>
              <TableCell align='center' >Book ID</TableCell>
              <TableCell align='center' >Name</TableCell>
              <TableCell align='center' >Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='center' >{books.id}</TableCell>
              <TableCell align='center' >{books.book_id}</TableCell>
              <TableCell align='center' >{books.book_title}</TableCell>
              <TableCell align='center' >{books.author_name}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant='contained' color='primary' onClick={handleClick}>
          Back to Home
        </Button>
      </Box>
    </>
  )
}

export default View
