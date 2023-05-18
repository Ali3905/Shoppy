import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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

const AddClient = () => {
    const [ creds, setCreds ] = useState({
        userName : '',
        email : '',
        phone : '',
        password : '',
        rfid: '',
    })
    const navigate = useNavigate()

    const theme = createTheme();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const { userName, email, phone, password, rfid } = creds
        const res = await axios({
        method: 'post',
        url: `https://bnbdevelopers-test-apis.vercel.app/addClient`,
        data: { 
            usrnme: userName,
            email: email,
            phone: phone,
            pwd: password,
            rfid: rfid,
         },
      });
        console.log(res);
        if(res.data.isSuccess === "True"){
          setCreds({
              userName : '',
              email : '',
              phone : '',
              password : '',
              rfid : '',
          })
          toast.success(`Client Added SuccessFully`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }else{
          toast.error(`${res.data.msg}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
      };

      useEffect(() => {
        if(!localStorage.getItem("token")){
          navigate("/login")
        }
      }, [])
  return (
    <>

      <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
      <ToastContainer />
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
            Add Client
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  value={creds.userName}
                  onChange={(e)=> setCreds({...creds, userName:e.target.value})}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={creds.email}
                  onChange={(e)=> setCreds({...creds, email:e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              value={creds.phone}
                  onChange={(e)=> setCreds({...creds, phone:e.target.value})}
              autoFocus
            />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={creds.password}
                  onChange={(e)=> setCreds({...creds, password:e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="rfid"
                  label="rfid"
                  type="text"
                  id="rfid"
                  autoComplete="rfid"
                  value={creds.rfid}
                  onChange={(e)=> setCreds({...creds, rfid:e.target.value})}
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Client
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default AddClient

