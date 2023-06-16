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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const LoginPage = () => {

    const [ creds, setCreds ] = useState({
        userName: '',
        password: '',
        role: '',
    })
    const navigate = useNavigate()

    const theme = createTheme();
    const handleSubmit = async(event) => {
      if(creds.role === "client"){
        event.preventDefault();
        const { userName, password } = creds
        const res = await axios({
        method: 'get',
        url: `https://bnbdevelopers-test-apis.vercel.app/signInClient?usrnme=${userName}&pwd=${password}`,
      });
      console.log(res)
    if(res.data.isSuccess === "True"){
        setCreds({
            userName : '',
            password : '',
          })
          await localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…U5NH0.ryE009ATv5POgo2_jW3ApeB8MoYb6MYUnu_J_2RSXZE")
          await localStorage.setItem("role", creds.role)
          await localStorage.setItem("balance", res.data.details.balance)
          await localStorage.setItem("rfid", res.data.details.rfid)
          await localStorage.setItem("name", res.data.details.usrnme)
          await localStorage.setItem("email", res.data.details.email)
          await localStorage.setItem("pic_url", res.data.details.pic_url)
          await localStorage.setItem("usrnme", res.data.details.usrnme)
          navigate('/userDashboard')
          window.location.reload();
        }else{
      toast.error(`Login Failed`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }}else if(creds.role === "admin"){
      event.preventDefault();
        const { userName, password } = creds
        const res = await axios({
        method: 'get',
        url: `https://bnbdevelopers-test-apis.vercel.app/signInAdmin?usrnme=${userName}&pwd=${password}`,
      });
      console.log(res)
    if(res.data.isSuccess === "True"){
        setCreds({
            userName : '',
            password : '',
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
      toast.error(`Login Failed`, {
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="User Name"
              value={creds.userName}
              onChange={(e)=> setCreds({...creds, userName:e.target.value})}
              autoFocus
            />
           
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={creds.password}
              onChange={(e)=> setCreds({...creds, password:e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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

export default LoginPage
