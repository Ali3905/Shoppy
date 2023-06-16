import React, { useEffect } from 'react';
import '../App.css';
import CardElement from '../components/CardElement';
// import Navbar from '../components/UserDashboard/Navbar';
import OrdersTable from '../components/OrdersTable';
// import Sidebar from '../components/UserDashboard/Sidebar';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
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

const UserDashboardPage = () => {
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState([])
  const [balance, setBalance] = useState(0)

  const getOrderListClient = async() => {
    const usrnme = localStorage.getItem("usrnme")
   const res = await axios({
    method: 'get',
    url: `https://bnbdevelopers-test-apis.vercel.app/getOrderListClient?username=${usrnme}`
   })  
   setOrderList(res.data.purchase)
   setBalance(res.data.balance)
  //  console.log(res.data)
  }

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }else{
      getOrderListClient()
    }
    setInterval(() => {
      getOrderListClient()
    }, 2000);
  }, [])
    return (
        <>
          {/* <Navbar/> */}
          <div className='container'>
          {/* <Sidebar/> */}
          <div className='left_container'>
                <div className='card_container1'>
                <CardElement  sx={{backgroundColor: "##acffac"}} total={"Current Balance"} total_deposit={balance} img={<img src="/img/img2.png" alt="" />}/>
                {/* <CardElement  sx={{backgroundColor: "##acffac"}} total={"Spent"} total_deposit={500} img={<LocalAtmIcon sx={{backgroundColor: "##acffac", color: "green"}} className='card_icon'/>}/>
                <CardElement  sx={{backgroundColor: "##acffac"}} total={"Remaining"} total_deposit={500} img={<AccountBalanceWalletIcon sx={{backgroundColor: "#a6a6ff" , color: "blue"}} className='card_icon'/>}/> */}
                </div>   
                <div className="orders">
                {/* <OrdersTable/> */}
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
          </div>
    
          </div>
        </>
      );
}

export default UserDashboardPage
