import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "../css/products.css"

const Products = () => {
  const [products, setProducts] = useState([])
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
  
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <>
    <div className="card_container">
    {products.length !== 0 &&  products.map((ele, i)=>{

     return <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "2rem 0rem", margin: "1rem 1rem" }} key={ele.i}>
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
        <Button size="medium" color="primary" className='btn' variant="contained">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
    })
  }
  </div>
    </>
  )
}

export default Products
