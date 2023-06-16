import React, { useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Orders = () => {
  const navigate = useNavigate()
  const editing = { allowDeleting: true, allowEditing: true };
  const [orderList, setOrderList] = useState([])

  const getOrderList = async() => {
    const usrnme = localStorage.getItem("usrnme")
    const res = await axios({
      method: 'get',
      url: `https://bnbdevelopers-test-apis.vercel.app/getOrderListAdmin?adminName=${usrnme}`
    })
    setOrderList(res.data)
    // console.log(res)
  }

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }else{
      getOrderList()
    }

    setInterval(() => {
      getOrderList()
    }, 2000);
  }, [])
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <TableContainer component={Paper}>
        <Table arial-aria-label='simple table' stickyHeader>
            <TableHead  >
                <TableRow>
                <TableCell align="left">User</TableCell>
                <TableCell align="center">Picture</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {orderList.length !== 0 &&  orderList.map((e, i)=>{
                      // price += ele.productTotalPrice
                     return e.map((ele, index)=>{
                           return <TableRow
                            key={index}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                {/* <TableCell sx={{: 200}} align='center'>{.id}</TableCell> */}
                                
                                <TableCell align='left'>{ele.username}</TableCell>
                                <TableCell align='center'>
                                  { ele.pic_url? <img src={ele.pic_url} alt="product" className='table_img m-0 inline'/> : "No image to Show"}
                                </TableCell>
                                <TableCell align='center'>{ele.productName}</TableCell>
                                <TableCell align='center'>Rs {ele.productPrice}</TableCell>
                                <TableCell align='center'>{ele.quantity}</TableCell>
                                {/* <TableCell align="center"><DeleteIcon onClick={()=>handleRemoveProduct(i)}/></TableCell> */}
                                <TableCell align='center'>Rs {ele.productTotalPrice}</TableCell>
                            </TableRow>

                      })
                        })
                    }
            </TableBody>
        </Table>
        {/* <div className='ml-2'>
      <Typography gutterBottom variant="h4" component="div" textAlign={'left'}>
        Total Price: <strong>Rs {price}</strong>
          </Typography>
      <Button size="medium" color="primary" className='btn' variant="contained" onClick={handleBuy}>
          Buy Now
        </Button>
      </div> */}
    </TableContainer>
    </div>
  );
};
export default Orders;
