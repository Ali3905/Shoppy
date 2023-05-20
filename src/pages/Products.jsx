import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CircularProgress, Box, Modal, MenuItem} from '@mui/material';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import "../css/products.css"
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [indexOfCard, setIndexOfCard] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [pid, setpid] = useState('')
  const editing = { allowDeleting: true, allowEditing: true };
  const getAllProducts = async() => {
    // e.preventDefault()
    // const { userName, password } = creds
   const res = await axios({
      method: 'get',
      url: `https://bnbdevelopers-test-apis.vercel.app/getAllProduct`,
    });
    console.log(res.data)
    setProducts(res.data)
  }


  const handleBuy = async() => {
   const res = await axios({
      method: 'post',
      url: `https://bnbdevelopers-test-apis.vercel.app/handlePayment`,
      data: { total_amount: price }
    });
    console.log(res.data)
    price = 0
    toast.success('Order Placed SuccessFully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
    setCart([])
  }

  const handleAddToCart = async(product) => {
      cart.unshift(product)
      setOpenModal(false)
      setQuantity(1)
      console.log(cart);
  }

  const handleBtnClicked = (i) => {
    setIndexOfCard(i)
    console.log(indexOfCard)
    setOpenModal(true)
  }
  const handleClose = () => {
    setOpenModal(false)
    setQuantity(1)
  };
  const add = () => setQuantity(quantity + 1)
  const minus = () => setQuantity(quantity - 1)

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

  const handleDeleteClient = (pid) => {
    setpid(pid)
    setDeleteModal(true)
  } 

  const handleDeletesSubmit = async(event) => {
    event.preventDefault();
    // let a = await localStorage.getItem("rfid")
      const res = await axios({
        method: 'delete',
        url: `https://bnbdevelopers-test-apis.vercel.app/deleteProduct?pid=${pid}`,
        data: {pid}
        });
        console.log(res.data);
        if(res.data.success === true){

          setDeleteModal(false)
          toast.success(`Product Deleted`, {
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

  
  const handleCloseDelete = () => setDeleteModal(false);


  var price = 0
  
  useEffect(()=>{
    getAllProducts()
  },[])

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
  }, [])
  return (
    <>
    <ToastContainer
      position="top-right"
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

    <div className='loader_container'> 
    {products.length === 0 &&  <CircularProgress />}
    </div>
    <div className="card_container">

    {products.length !== 0 &&  products.map((ele, i)=>{

     return <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "2rem 0rem", margin: "1rem 1rem" }} key={i}>
      <CardActionArea>
        <img src={ele.pic_url} alt="" className='card_img'/>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" textAlign={'center'}>
            {ele.productName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
            Rs {ele.productPrice}
          </Typography>
          {/* <Typography variant="body1" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary" className='btn' variant="contained" onClick={()=>handleBtnClicked(i)}>
          Add to Cart 
        </Button>
        <Button size="medium" className='btn_delete' variant="contained" onClick={()=>handleDeleteClient(ele.pid)}>
        Delete
        </Button>
      </CardActions>
    </Card>
    })
  }
  </div>
  {openModal && <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "2rem 0rem", margin: "1rem 1rem" }}>
      <CardActionArea>
        <img src={products[indexOfCard].pic_url} alt="" className='card_img'/>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" textAlign={'center'}>
            {products[indexOfCard].productName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
            Rs {products[indexOfCard].productPrice}
          </Typography>
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
     
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display: "flex", flexDirection: "column"}}>
      <div className="flex items-center border-1 border-r-0 border-color rounded">
          <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "><AiOutlineMinus onClick={minus}/></p>
          <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">{quantity}</p>
          <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus onClick={add}/></p>
        </div>
      <div className="flex items-center border-1 border-r-0 border-color rounded">
      <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
            Total Price
          </Typography> 
        </div>
        <div>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
        Rs {products[indexOfCard].productPrice * quantity}
          </Typography>
          </div>
        <Button size="medium" color="primary" className='btn' variant="contained" onClick={()=>handleAddToCart({
          pic_url: products[indexOfCard].pic_url,
          productName: products[indexOfCard].productName,
          productPrice: products[indexOfCard].productPrice,
          productTotalPrice: products[indexOfCard].productPrice * quantity,
          quantity: quantity, 
        })}>
        Add to Cart
        </Button>
        
      </CardActions>
    </Card>
        </Box>
      </Modal>}
     {cart.length !== 0 && <div>
     <h2 className='ml-2'>Cart</h2>
    <TableContainer component={Paper}>
        <Table arial-aria-label='simple table' stickyHeader>
            <TableHead  >
                <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="left">Picture</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {cart.map((ele, i)=>{
                      price += ele.productTotalPrice
                           return <TableRow
                            key={i}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                {/* <TableCell sx={{: 200}} align='center'>{.id}</TableCell> */}
                                
                                <TableCell align='left'>{ele.productName}</TableCell>
                                <TableCell align='left'>
                                  <img src={ele.pic_url} alt="product" className='table_img'/>
                                </TableCell>
                                <TableCell align='center'>Rs {ele.productPrice}</TableCell>
                                <TableCell align='center'>{ele.quantity}</TableCell>
                                <TableCell align='center'>Rs {ele.productTotalPrice}</TableCell>
                            </TableRow>
                        })
                    }
            </TableBody>
        </Table>
        <div className='ml-2'>
      <Typography gutterBottom variant="h4" component="div" textAlign={'left'}>
        Total Price: <strong>Rs {price}</strong>
          </Typography>
      <Button size="medium" color="primary" className='btn' variant="contained" onClick={handleBuy}>
          Buy Now
        </Button>
      </div>
    </TableContainer>
     </div>}

      {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="left">Picture</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {cart.map((ele, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ele.productName}
              </TableCell>
              <TableCell align="left">{ele.productName}</TableCell>
              <TableCell align="left">{ele.productName}</TableCell>
              <TableCell align="left">{ele.productName}</TableCell>
              <TableCell align="left">{ele.productName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='ml-2'>
      <Typography gutterBottom variant="h4" component="div" textAlign={'left'}>
        Total Price <h4>{price}</h4>
          </Typography>
      <Button size="medium" color="primary" className='btn' variant="contained" >
          Buy Now
        </Button>
      </div>
    </TableContainer> */}

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
              sx={{ mt: 3, mb: 2, bgcolor: "#d50000" }}
            >
             Delete
            </Button>
        </Box>
        </Box>
      </Modal>
    </div>
    </>
  )
}

export default Products
