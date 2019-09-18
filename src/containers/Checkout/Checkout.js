import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import classes from './Checkout.css'


import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }

  // UNSAFE_componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let price = 0
  //   for(let param of query.entries()) {
  //     // ['salad', '1'...]
  //     if(param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price})
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    let summary = <Redirect to="/"/>
    if (this.props.ings) {
      summary = (
        <div className={classes.Checkout}>
          <CheckoutSummary  
            ingredients={this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          <Route 
            path={this.props.match.path + '/contact-data'} 
            // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} 
            component={ContactData} />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)