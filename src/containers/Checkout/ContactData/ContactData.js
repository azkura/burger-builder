import React, { Component } from 'react'
import classes from './ContactData.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipCode'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      },
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
    const formElementArray = []

    for (let key in this.state.orderForm ) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (<form>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}/>
        ))}
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