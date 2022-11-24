import React from 'react'
import {Typography,Box, TableContainer,Table, TableBody, TableCell,
     TableHead,TableRow,Paper,IconButton,Tooltip } from "@mui/material"; 
import { orange, pink } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
    
const List = () => {
    const [books, setBook]= useState([]);
    const [status, setStatus] = useState(false);
    useEffect(()=>{
        getAllBook()
    },[]);

    async function getAllBook(){
        try{
            const books = await axios.get("https://capregsofttask.herokuapp.com/books/");
            setBook(books.data);
        }catch(error){
           console.log("something wentt wrong");
        }
    } 
const handelDelete = async (id, e)=>{
    // e.preventDefault();
    await axios.delete(`https://capregsofttask.herokuapp.com/books/${id}`);
    var newBook = books.filter((item) => {
        return item.id !== id ;
    })
    setBook(newBook);
}

    const Nothing = () => {
        return(
            <h3>No Data Found</h3>
        );
    }

    const Data = () => {
        return(
            <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow style={{backgroundColor: '#616161' }}>
                    <TableCell align='center' >Sr</TableCell>
                    <TableCell align='center' >Book ID</TableCell>
                    <TableCell align='center' >Book Title</TableCell>
                    <TableCell align='center' >Auhor Name</TableCell>
                    <TableCell align='center' >Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    books.map((book,i)=>{
                        return(
                <TableRow key={i}>
                <TableCell align='center' >{book.id}</TableCell>
                <TableCell align='center' >{book.book_id}</TableCell>
                <TableCell align='center' >{book.book_title}</TableCell>
                <TableCell align='center' >{book.author_name}</TableCell>
                <TableCell align='center' >
                    <Tooltip title="view">
                        <IconButton>
                            <Link to={`/view/${book.id}`}>
                                < VisibilityIcon color='primary'/>
                            </Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton>
                            <Link to={`/edit/${book.id}`}>
                                <EditIcon />
                            </Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={()=> handelDelete(book.id)}>
                            < DeleteIcon sx={{ color: pink[500] }} />
                        </IconButton>
                    </Tooltip>
                </TableCell>

                </TableRow>

                        )
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
        );
    }

  return (
    <>
            <Box textAlign="center" p={2} mb={2} sx={{ color:"white", backgroundColor: orange[500] }}>
                <Typography variant='h4'  >Avaiable Books</Typography>
            </Box>
            <Data />
            
            
    </>
  )
}

export default List
