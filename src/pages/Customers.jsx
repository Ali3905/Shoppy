import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { CircularProgress } from '@mui/material';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Customers = () => {
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
    console.log(res.data)
    setClients(res.data)
  }

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
              <TableCell align="center">{row.rfid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>
    </>
  );
};

export default Customers;
