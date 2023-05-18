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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AddBalance = () => {
    
    const [ creds, setCreds ] = useState({
        balance : '',
    })
    const navigate = useNavigate()

    const theme = createTheme();
    const handleSubmit = async(event) => {
        event.preventDefault();
        const { balance } = creds
        console.log(balance)
        let a = await localStorage.getItem("rfid")
          const res = await axios({
            method: 'get',
            url: `https://bnbdevelopers-test-apis.vercel.app/addbalance_esp?rfid=${a}&addMoney=${balance}`,
            
            });
            console.log(res);
            if(res.data.isSuccess === "True"){
              setCreds({
                  balance : '',
              })
              await localStorage.setItem("balance", res.data.details.balance)
              toast.success(`Balance added`, {
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
          <Typography component="h1" variant="h5">
           Add Balance
          </Typography>
         
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="balance"
                  type='number'
                  required
                  fullWidth
                  id="balance"
                  label="Balance"
                  value={creds.balance}
                  onChange={(e)=> setCreds({...creds, balance:e.target.value})}
                  autoFocus
                />
              </Grid>
              
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={creds.balance === '' ? true : false}
            >
             Add Balance
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  )
}

export default AddBalance
