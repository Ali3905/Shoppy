import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CircularProgress, Box, Modal, MenuItem} from '@mui/material';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import "../css/products.css"

const Products = () => {
  const [products, setProducts] = useState([])
  const [indexOfCard, setIndexOfCard] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [quantity, setQuantity] = useState(1)
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


  const handleBuy = async(price) => {
   const res = await axios({
      method: 'post',
      url: `https://bnbdevelopers-test-apis.vercel.app/handlePayment`,
      data: { total_amount: price }
    });
    console.log(res.data)
    setQuantity(1)
    if(res.data.msg === "Amount Updated"){
      setOpenModal(false)
    }
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
  
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <>
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
            ${ele.productPrice}
          </Typography>
          {/* <Typography variant="body1" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="primary" className='btn' variant="contained" onClick={()=>handleBtnClicked(i)}>
          Buy Now
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
            $ {products[indexOfCard].productPrice}
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
        {products[indexOfCard].productPrice * quantity}
          </Typography>
          </div>
        <Button size="medium" color="primary" className='btn' variant="contained" onClick={()=>handleBuy(products[indexOfCard].productPrice * quantity)}>
          Buy Now
        </Button>
      </CardActions>
    </Card>
        </Box>
      </Modal>}
    </>
  )
}

export default Products
