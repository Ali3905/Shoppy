import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { CircularProgress } from '@mui/material';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';

// import { customersData, customersGrid } from '../data/dummy';
// import { Header } from '../components';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Customers = () => {
  const [rfid, setrfid] = useState('')
  const [balanceModal, setbalanceModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [creds, setCreds] = useState({
    balance: ''
  })
  const [clients, setClients] = useState([])
  const navigate = useNavigate()
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };
  const getAllClients = async() => {
    const res = await axios({
      method: 'get',
      url: `https://bnbdevelopers-test-apis.vercel.app/getAllClient`,
    });
    setClients(res.data)
  }

  // const theme = createTheme();
  const handleSubmit = async(event) => {
      event.preventDefault();
      const { balance } = creds
      console.log(balance)
      // let a = await localStorage.getItem("rfid")
        const res = await axios({
          method: 'get',
          url: `https://bnbdevelopers-test-apis.vercel.app/addbalance_esp?rfid=${rfid}&addMoney=${balance}`,
          
          });
          console.log(res);
          if(res.data.isSuccess === "True"){
            setCreds({
                balance : '',
            })
            setbalanceModal(false)
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
              getAllClients()
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
  const handleDeletesSubmit = async(event) => {
      event.preventDefault();
      // let a = await localStorage.getItem("rfid")
        const res = await axios({
          method: 'delete',
          url: `https://bnbdevelopers-test-apis.vercel.app/deleteClient?rfid=${rfid}`,
          data: {rfid}
          });
          console.log(res.data);
          if(res.data.success === true){

            setDeleteModal(false)
            toast.success(`Client Deleted`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });
              getAllClients()
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

    const handleAddBalance = (rfid) => {
      setrfid(rfid)
      setbalanceModal(true)
    }

    const handleDeleteClient = (rfid) => {
      setrfid(rfid)
      console.log(rfid);
      setDeleteModal(true)
    }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleCloseBalance = () => setbalanceModal(false);
  const handleCloseDelete = () => setDeleteModal(false);

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    getAllClients()
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
    <div className='loader_container'> 
    {clients.length === 0 &&  <CircularProgress />}
    </div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
     {clients &&  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="left">Picture</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Add Balance</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell align="center">rfid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.usrnme}
              </TableCell>
              <TableCell align="center">
                <img src={row.pic_url} alt="client" className="table_img" />
              </TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.balance}</TableCell>
              <TableCell align="center"><AddIcon onClick={()=>handleAddBalance(row.rfid)}/></TableCell>
              <TableCell align="center"><DeleteIcon onClick={()=>handleDeleteClient(row.rfid)}/></TableCell>
              <TableCell align="center">{row.rfid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>

    <div>
      <Modal
        open={balanceModal}
        onClose={handleCloseBalance}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
      </Modal>
    </div>
    <div>
      <Modal
        open={deleteModal}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography component="h1" variant="h5">
           Are sure you want to delete this client ?
          </Typography>
         
          <Box component="form" noValidate onSubmit={handleDeletesSubmit} sx={{ mt: 3 }} display={'flex'} gap={"1rem"}>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>setDeleteModal(false)}
            >
             Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="btn_delete"
            >
             Delete
            </Button>
        </Box>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default Customers;
