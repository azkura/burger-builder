import React, { PureComponent } from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends PureComponent {
  componentDidUpdate() {
    console.log('[OrderSummary], didUpdate')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
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
        <p><span style={{fontWeight: 'bold'}}>Total Price: {this.props.totalPrice.toFixed(2)} €</span></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary