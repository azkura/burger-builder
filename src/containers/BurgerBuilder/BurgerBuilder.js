import React, { Component } from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatedPurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredient = {
      ...this.state.ingredients
    }
    updatedIngredient[type] = updatedCount

    // calculate the price...
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice })
    this.updatedPurchaseState(updatedIngredient)
  }

  removeIgredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updatedIngredient = {
      ...this.state.ingredients
    }
    updatedIngredient[type] = updatedCount

    // calculate the price...
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice })
    this.updatedPurchaseState(updatedIngredient)
  }

  purchaseHandler = () => {
    let isPurchase = this.state.purchasing
    this.setState({ purchasing: !isPurchase })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinuedHandler = () => {
    this.setState({ loading: true })
    // alert('You want to continue')
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Aziz Koura',
        adresse: {
          street: 'buckingham palace 1',
          zipCode: '56700',
          country: 'London'
        },
        email: 'theDuck@gmail.com'
      },
      deliveryMethod: 'Fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response)
        this.setState({ loading: false, purchasing: false })
      }).catch(error => {
        console.log(error)
        this.setState({ loading: false, purchasing: false })
      })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // {salad: true, meat: false ...}

    let orderSummary = <OrderSummary 
      ingredients={this.state.ingredients}
      totalPrice={this.state.totalPrice}
      cancelled={this.purchaseCancelHandler}
      continued={this.purchaseContinuedHandler}/>

      if(this.state.loading) {
        orderSummary = <Spinner />
      }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIgredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder