import React, { Component } from 'react'
import classes from './ContactData.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adresse: {
      street: '',
      zipCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    // console.log(this.props.ingredients)

    this.setState({ loading: true })
   
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({ loading: false})
        this.props.history.push('/')
      }).catch(error => {
        console.log(error)
        this.setState({ loading: false })
      })
  }

  render() {
    let form = (<form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
        <input className={classes.Input} type="text" name="zipCode" placeholder="Your ZipCode" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    )

    if(this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData