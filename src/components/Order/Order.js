import React from 'react'
import classes from './Order.css'

const Order = props => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>Eur 6.50</strong></p>
  </div>
)

export default Order