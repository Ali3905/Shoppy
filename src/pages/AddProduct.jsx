import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [ creds, setCreds ] = useState({
        productName: '',
        productPrice: '',
    })
    const navigate = useNavigate()

    const theme = createTheme();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const { productName, productPrice } = creds
        const res = await axios({
        method: 'post',
        url: `https://bnbdevelopers-test-apis.vercel.app/addProduct`,
        data: { productName, productPrice }
      });
      console.log(res)
    if(res.data.isSuccess === "True"){
        setCreds({
            productName: '',
            productPrice: '',
          })
          toast.success('Product Added SuccessFully', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
      };
  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="Product Name"
              name="productName"
              autoComplete="Product Name"
              value={creds.productName}
              onChange={(e)=> setCreds({...creds, productName:e.target.value})}
              autoFocus
            />
           
            <TextField
              margin="normal"
              required
              fullWidth
              name="productPrice"
              label="Product Price"
              type="number"
              id="productPrice"
              autoComplete="Product Price"
              value={creds.productPrice}
              onChange={(e)=> setCreds({...creds, productPrice:e.target.value})}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={creds.productName.length === 0 || creds.productPrice.length === 0 ? true : false}
            >
              Add Product
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default AddProduct
