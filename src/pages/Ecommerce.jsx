import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

// import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import Typography from '@mui/material/Typography';
import { Button, Box, Modal} from '@mui/material';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const navigate = useNavigate()
  const { currentColor, currentMode } = useStateContext();
  const [adminDetails, setAdminDetails] = useState({})
  const [balance, setBalance] = useState(false)

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

  const getAdminDetails = async() => {
    const usrnme = localStorage.getItem("usrnme")
    const res = await axios({
      method: 'get',
      url: `https://bnbdevelopers-test-apis.vercel.app/getAdminDetails?usrnme=${usrnme}`,
    });
    console.log(res.data)
    if (res.data.isSuccess === "True") {
      setAdminDetails(res.data.details)
    }
  }
  const issufficient = async() => {
    const usrnme = localStorage.getItem("usrnme")
    const res = await axios({
      method: "get",
      url: `https://bnbdevelopers-test-apis.vercel.app/get_issufficient?adminName=${usrnme}`
    })
    console.log(res.data.isSufficient)
    if(res.data.isSufficient === 0){
      setBalance(true)
    }else{
      setBalance(false)
    }
  }

  const set_BalanceSufficient = async() => {
    const usrnme = localStorage.getItem("usrnme")
    const res = await axios({
      method: "get",
      url: `https://bnbdevelopers-test-apis.vercel.app/set_issufficient?adminName=${usrnme}`
    })
    console.log(res.data)
    
  }

  const handleBalanceSubmit = () => {
    set_BalanceSufficient()
    setBalance(false)
  }

  const handleClosebalance = () => {
    setBalance(false)
  }

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }else{
      getAdminDetails()
    }
  }, [])

  useEffect(() => {
    setInterval(() => {
      issufficient()
    if(balance){
        setBalance(true)
        console.log("hlo");
        
      }
    }, 3000);
  },[])
  return (
    <div className="mt-24">
      
     <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex flex-col-reverse justify-between items-start">
            <div>
              <p className="text-2xl">Rs {adminDetails.total_earning}</p>
              <p className="font-bold text-gray-400">Earnings</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          {/* <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div> */}
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item,i) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{i===0? adminDetails.total_customers: adminDetails.total_products}</span>
                
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
      <Modal
        open={balance}
        onClose={handleClosebalance}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography component="h1" variant="h5">
           Insufficient Balance
          </Typography>
         
          <Box component="form" noValidate sx={{ mt: 3 }} display={'flex'} gap={"1rem"}>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleBalanceSubmit}
            >
             UnderStood
            </Button>
        </Box>
        </Box>
      </Modal>
    </div>
    </div>
  );
};

export default Ecommerce;
