import React from 'react'

const CardElement = (props) => {
  return (
    <div className='card1'>
      <div>
        {props.img}
      </div>
      <div className='text'>
        <p>Rs {props.total_deposit}</p>
        <h2>{props.total}</h2>
      </div>
    </div>
  )
}

export default CardElement
