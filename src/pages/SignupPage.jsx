import React, { useState } from 'react'
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SignupPage = () => {
    
    const [ creds, setCreds ] = useState({
        userName : '',
        email : '',
        phone : '',
        password : '',
        rfid: '',
        role: '',
    })
    const navigate = useNavigate()

    const theme = createTheme();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const { userName, email, phone, password, rfid } = creds
        if(creds.role === "client"){
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
              await localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…U5NH0.ryE009ATv5POgo2_jW3ApeB8MoYb6MYUnu_J_2RSXZE")
              await localStorage.setItem("role", creds.role)
              await localStorage.setItem("rfid", res.data.details.rfid)
              await localStorage.setItem("name", res.data.details.usrnme)
              await localStorage.setItem("email", res.data.details.email)
              await localStorage.setItem("pic_url", res.data.details.pic_url)
              await localStorage.setItem("usrnme", res.data.details.usrnme)
              navigate('/userDashboard')
              window.location.reload();
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
        }else if(creds.role === "admin"){
          const res = await axios({
            method: 'post',
            url: `https://bnbdevelopers-test-apis.vercel.app/addAdmin`,
            data: { 
                usrnme: userName,
                email: email,
                phone: phone,
                pwd: password,
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
              await localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…U5NH0.ryE009ATv5POgo2_jW3ApeB8MoYb6MYUnu_J_2RSXZE")
              await localStorage.setItem("role", creds.role)
              await localStorage.setItem("name", res.data.details.usrnme)
              await localStorage.setItem("email", res.data.details.email)
              await localStorage.setItem("pic_url", res.data.details.pic_url)
              await localStorage.setItem("usrnme", res.data.details.usrnme)
              navigate('/ecommerce')
              window.location.reload();
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
        }
        
      };
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
      <ThemeProvider theme={theme} margin={"0 0"}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <div className='radio_container'>
          <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Role</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={creds.role}
              onChange={(e)=> setCreds({...creds, role:e.target.value})}
          >
            <div className='radio'>
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="client" control={<Radio />} label="Client" />
            </div>
          </RadioGroup>
        </FormControl>
        </div>
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
                  type="email"
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
              type="number"
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
              {creds.role === "client" &&<Grid item xs={12}>
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
              </Grid>}
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                creds.role === 'client'?
                creds.userName === '' || creds.email === '' || creds.phone === '' || creds.password === '' || creds.rfid === '' ? true : false:
                creds.userName === '' || creds.email === '' || creds.phone === '' || creds.password === ''  ? true : false
                
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default SignupPage
