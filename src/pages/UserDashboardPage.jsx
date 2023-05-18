import React, { useEffect } from 'react';
import '../App.css';
import CardElement from '../components/CardElement';
// import Navbar from '../components/UserDashboard/Navbar';
import OrdersTable from '../components/OrdersTable';
// import Sidebar from '../components/UserDashboard/Sidebar';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { useNavigate } from 'react-router-dom';

const UserDashboardPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
  }, [])
    return (
        <>
          {/* <Navbar/> */}
          <div className='container'>
          {/* <Sidebar/> */}
          <div className='left_container'>
                <div className='card_container1'>
                <CardElement  sx={{backgroundColor: "##acffac"}} total={"Total Deposit"} total_deposit={localStorage.getItem("balance")} img={<img src="/img/img2.png" alt="" />}/>
                <CardElement  sx={{backgroundColor: "##acffac"}} total={"Spent"} total_deposit={500} img={<LocalAtmIcon sx={{backgroundColor: "##acffac", color: "green"}} className='card_icon'/>}/>
                <CardElement  sx={{backgroundColor: "##acffac"}} total={"Remaining"} total_deposit={500} img={<AccountBalanceWalletIcon sx={{backgroundColor: "#a6a6ff" , color: "blue"}} className='card_icon'/>}/>
                </div>   
                <div className="orders">
                <OrdersTable/>
                </div>
          </div>
    
          </div>
        </>
      );
}

export default UserDashboardPage
