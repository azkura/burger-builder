import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actionTypes from '../../store/actions'

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7
// }

class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // console.log(this.props)
    // axios.get('https://react-burger-builder-app-81b53.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data })
    //   }).catch(error => {
    //     this.setState({ error: true })
    //   })
  }

  updatedPurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(ingKey => {
      return ingredients[ingKey]
    }).reduce((sum, el) => {
      return sum + el
    }, 0)
    // this.setState({ purchasable: sum > 0 })
    return sum > 0 
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   const updatedCount = oldCount + 1
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredient[type] = updatedCount

  //   // calculate the price...
  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition

  //   this.setState({ ingredients: updatedIngredient, totalPrice: newPrice })
  //   this.updatedPurchaseState(updatedIngredient)
  // }

  // removeIgredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   if(oldCount <= 0) {
  //     return
  //   }
  //   const updatedCount = oldCount - 1
  //   const updatedIngredient = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredient[type] = updatedCount

  //   // calculate the price...
  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction

  //   this.setState({ ingredients: updatedIngredient, totalPrice: newPrice })
  //   this.updatedPurchaseState(updatedIngredient)
  // }

  purchaseHandler = () => {
    let isPurchase = this.state.purchasing
    this.setState({ purchasing: !isPurchase })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinuedHandler = () => {
    // alert('You want to continue')
    
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)

    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // {salad: true, meat: false ...}

    let orderSummary = null 
    const {error} = this.state
    let burger = error ? <p style={{textAlign: 'center'}}>Oups! something went wrong!.. Please try later</p> : <Spinner />

    if(this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatedPurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </Aux>
      )
      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        totalPrice={this.props.price}
        cancelled={this.purchaseCancelHandler}
        continued={this.purchaseContinuedHandler}
      />
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))