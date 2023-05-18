import React from 'react'
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material'

const OrdersTable = () => {

  return (
    <>
    
    <h2>Orders</h2>
    <TableContainer component={Paper}>
        <Table arial-aria-label='simple table' stickyHeader>
            <TableHead  >
                <TableRow>
                    <TableCell align='center'>Order Id</TableCell>
                    <TableCell align='center'>Brand</TableCell>
                    <TableCell align='center'>Order</TableCell>
                    <TableCell align='center'>Delivery Date</TableCell>
                    <TableCell align='center'>Delivery Price</TableCell>
                    <TableCell align='center'>Payment Method</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {data.map((ele)=>{
                           return <TableRow
                            key={ele.id}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                            >
                                <TableCell sx={{maxWidth: 200}} align='center'>{ele.id}</TableCell>
                                
                                <TableCell align='center'>{ele.brand}</TableCell>
                                <TableCell align='center'>{ele.order}</TableCell>
                                <TableCell align='center'>{ele.delivery_date}</TableCell>
                                <TableCell align='center'>{ele.price}</TableCell>
                                <TableCell align='center'>{ele.card_type}</TableCell>
                            </TableRow>
                        })
                    }
            </TableBody>
        </Table>
    </TableContainer>
    
    </>
  )
}

const data = [{
  "id": "01H05SV500",
  "brand": "Nike",
  "order": "Adidas Hat",
  "price": "$619.24",
  "card_type": "Master-card",
  "delivery_date": "11/13/2022"
}, {
  "id": "01H05SV501",
  "brand": "Apple",
  "order": "Nike shorts",
  "price": "$600.95",
  "card_type": "Paypal",
  "delivery_date": "5/25/2022"
}, {
  "id": "01H05SV502",
  "brand": "Apple",
  "order": "Adidas Hat",
  "price": "$531.68",
  "card_type": "Visa",
  "delivery_date": "11/24/2022"
}, {
  "id": "01H05SV503",
  "brand": "Adidas",
  "order": "iPad 2022",
  "price": "$167.74",
  "card_type": "Master-card",
  "delivery_date": "10/29/2022"
}, {
  "id": "01H05SV504",
  "brand": "Apple",
  "order": "Nike shorts",
  "price": "$74.68",
  "card_type": "Master-card",
  "delivery_date": "7/12/2022"
}, {
  "id": "01H05SV505",
  "brand": "Apple",
  "order": "iPad 2022",
  "price": "$143.31",
  "card_type": "Master-card",
  "delivery_date": "10/15/2022"
}, {
  "id": "01H05SV506",
  "brand": "Nike",
  "order": "Nike shorts",
  "price": "$840.02",
  "card_type": "Paypal",
  "delivery_date": "3/29/2023"
}, {
  "id": "01H05SV507",
  "brand": "Apple",
  "order": "iPad 2022",
  "price": "$869.83",
  "card_type": "Paypal",
  "delivery_date": "9/14/2022"
}, {
  "id": "01H05SV508",
  "brand": "Nike",
  "order": "iPad 2022",
  "price": "$899.39",
  "card_type": "Master-card",
  "delivery_date": "1/26/2023"
}, {
  "id": "01H05SV509",
  "brand": "Nike",
  "order": "Nike shorts",
  "price": "$735.45",
  "card_type": "Visa",
  "delivery_date": "8/24/2022"
}]

export default OrdersTable
