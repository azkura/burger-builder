import React from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    )
  })
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><span style={{fontWeight: 'bold'}}>Total Price</span> : {props.totalPrice.toFixed(2)} €</p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
    </Aux>
  )
}

export default orderSummary